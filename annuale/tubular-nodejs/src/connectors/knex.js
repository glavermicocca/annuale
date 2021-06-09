var _ = require('lodash');
var { CompareOperators } = require('tubular-common');
var { AggregateFunctions } = require('tubular-common');
var { ColumnSortDirection } = require('tubular-common');
var { GridResponse } = require('tubular-common');

function getCompareOperators(operator) {
    switch (operator) {
        case CompareOperators.Gte:
            return '>=';
        case CompareOperators.Gt:
            return '>';
        case CompareOperators.Lte:
            return '<=';
        case CompareOperators.Lt:
            return '<';
        default:
            throw 'Unsupported Compare Operator';
    }
}

function createGridResponse(request, subset) {
    let promises = [
        subset
            .clone()
            .clear('with')
            .clear('select')
            .clear('columns')
            //.clear('where')
            .clear('union')
            //.clear('join')
            //.clear('group')
            .clear('order')
            .clear('having')
            .clear('limit')
            .clear('offset')
            .clear('counter')
            .clear('counters')
            .count('* as tbResult')
            .then((result) => ({ TotalRecordCount: result.length > 0 ? Number(result[0].tbResult) : 0 })),
    ];

    subset = applyFreeTextSearch(request, subset);
    subset = applyFiltering(request, subset);
    subset = applySorting(request, subset);

    promises.push(
        subset
            .clone()
            .clear('with')
            .clear('select')
            .clear('columns')
            //.clear('where')
            .clear('union')
            //.clear('join')
            //.clear('group')
            .clear('order')
            .clear('having')
            .clear('limit')
            .clear('offset')
            .clear('counter')
            .clear('counters')
            .count('* as tbResult')
            .then((result) => ({ FilteredRecordCount: result.length > 0 ? Number(result[0].tbResult) : 0 })),
    );

    let subsetForAggregates = subset.clone();

    promises.push(
        getAggregatePayload(request, subsetForAggregates).then((values) => ({
            AggregationPayload: _.reduce(values, _.merge, {}),
        })),
    );

    let response = new GridResponse({
        Counter: request.Counter,
        TotalPages: 1,
        CurrentPage: 1,
    });

    return Promise.all(promises)
        .then((values) => {
            response = _.reduce(values, _.merge, response);

            // Take with value -1 represents entire set
            if (request.take > -1) {
                response.TotalPages = Math.ceil(response.FilteredRecordCount / request.take);

                if (response.TotalPages > 0) {
                    response.CurrentPage = request.skip / request.take + 1;

                    if (request.skip > 0) {
                        subset = subset.offset(request.skip);
                    }
                }

                subset = subset.limit(request.take);
            }

            return subset;
        })
        .then((rows) => {
            // response.Payload = rows.map((row) => {
            //     return request.columns.map((c) => {
            //         return row[c.name];
            //     });
            // });

            //associa tutti i valori richiesti in definizione colonna p.e. tabella.id joinTabella.id
            let posDot, arrR, colum;

            const arrRows = [];
            for (let index = 0; index < rows.length; index++) {
                const row = rows[index];
                arrR = [];
                for (let ii = 0; ii < request.columns.length; ii++) {
                    colum = request.columns[ii];
                    if (colum.name.lastIndexOf(' as ') > -1) {
                        posDot = colum.name.lastIndexOf(' as ');
                        arrR.push(row[colum.name.substr(posDot + 4)]);
                    } else {
                        posDot = colum.name.lastIndexOf('.');
                        arrR.push(row[colum.name.substr(posDot + 1)]);
                    }
                }
                arrRows.push(arrR);
            }

            response.Payload = arrRows;

            return response;
        });
}

function applySorting(request, subset) {
    let sortedColumns = _.filter(request.columns, (column) => column.sortOrder > 0);

    if (sortedColumns.length > 0) {
        sortedColumns = _.sortBy(sortedColumns, ['sortOrder']);

        var name = '';

        _.forEachRight(sortedColumns, (column) => {
            name = column.name;
            if (name.lastIndexOf(' as ') > -1) {
                var posDot = column.name.lastIndexOf(' as ');
                name = name.substr(0, posDot);
            } else {
                subset.orderBy(name, column.sortDirection == ColumnSortDirection.Ascending ? 'asc' : 'desc');
            }
        });
    } else {
        // Default sorting
        subset = subset.orderBy(request.columns[0].name, 'asc');
    }

    return subset;
}

function getAggregatePayload(request, subset) {
    let aggregateColumns = _.filter(
        request.columns,
        (column) => column.aggregate && column.aggregate != AggregateFunctions.None,
    );

    return Promise.all(
        _.map(aggregateColumns, (column) => {
            // Do not disrupt the original query chain
            let copyOfSubset = subset.clone();

            // in order to work with aggregates
            copyOfSubset.clear('select').clear('order').clear('having');

            switch (column.aggregate) {
                case AggregateFunctions.Sum:
                    copyOfSubset = copyOfSubset.sum(`${column.name} as tbResult`);
                    break;
                case AggregateFunctions.Average:
                    copyOfSubset = copyOfSubset.avg(`${column.name} as tbResult`);
                    break;
                case AggregateFunctions.Max:
                    copyOfSubset = copyOfSubset.max(`${column.name} as tbResult`);
                    break;
                case AggregateFunctions.Min:
                    copyOfSubset = copyOfSubset.min(`${column.name} as tbResult`);
                    break;
                case AggregateFunctions.Count:
                    copyOfSubset = copyOfSubset.countDistinct(`${column.name} as tbResult`); //postgres
                    break;
                case AggregateFunctions.DistinctCount:
                    copyOfSubset = copyOfSubset.countDistinct(`${column.name} as tbResult`);
                    break;
                default:
                    throw 'Unsupported aggregate function';
            }

            return copyOfSubset.then((result) => ({ [column.name]: result[0].tbResult }));
        }),
    );
}

function applyFreeTextSearch(request, subset) {
    // Free text-search
    if (request.searchText) {
        // && request.search.operator == CompareOperators.Auto
        let searchableColumns = _.filter(request.columns, 'searchable');

        if (searchableColumns.length > 0) {
            subset = subset.where(function () {
                let isFirst = true;
                let _subset = this;
                searchableColumns.forEach((column) => {
                    var name = column.name;

                    if (name.lastIndexOf(' as ') > -1) {
                        var posDot = name.lastIndexOf(' as ');
                        name = name.substr(0, posDot);
                    }

                    if (isFirst) {
                        _subset.where(name, 'ILIKE', '%' + request.searchText + '%');
                        isFirst = false;
                    } else _subset.orWhere(name, 'ILIKE', '%' + request.searchText + '%');
                });
            });
        }
    }

    return subset;
}

function applyFiltering(request, subset) {
    // Filter by columns
    let filteredColumns = request.columns.filter(
        (column) =>
            column.filterable && column.filterText != undefined && column.filterOperator != CompareOperators.None,
    );

    filteredColumns.forEach((filterableColumn) => {
        request.columns.find((column) => column.name == filterableColumn.name).HasFilter = true;

        var name = filterableColumn.name;

        if (name.lastIndexOf(' as ') > -1) {
            var posDot = name.lastIndexOf(' as ');
            name = name.substr(0, posDot);
        }

        switch (filterableColumn.filterOperator) {
            case CompareOperators.Equals:
                subset = subset.where(name, filterableColumn.filterText);
                break;
            case CompareOperators.NotEquals:
                subset = subset.whereNot(name, filterableColumn.filterText);
                break;
            case CompareOperators.Contains:
                subset = subset.where(name, 'ILIKE', `%${filterableColumn.filterText}%`);
                break;
            case CompareOperators.NotContains:
                subset = subset.whereNot(name, 'ILIKE', `%${filterableColumn.filterText}%`);
                break;
            case CompareOperators.StartsWith:
                subset = subset.where(name, 'ILIKE', `${filterableColumn.filterText}%`);
                break;
            case CompareOperators.NotStartsWith:
                subset = subset.whereNot(name, 'ILIKE', `${filterableColumn.filterText}%`);
                break;
            case CompareOperators.EndsWith:
                subset = subset.where(name, 'ILIKE', `%${filterableColumn.filterText}`);
                break;
            case CompareOperators.NotEndsWith:
                subset = subset.whereNot(name, 'ILIKE', `%${filterableColumn.filterText}`);
                break;
            case CompareOperators.Gt:
            case CompareOperators.Gte:
            case CompareOperators.Lt:
            case CompareOperators.Lte:
                subset = subset.where(
                    name,
                    getCompareOperators(filterableColumn.filterOperator),
                    filterableColumn.filterText,
                );
                break;
            case CompareOperators.Between:
                subset = subset.whereBetween(name, [filterableColumn.filterText, filterableColumn.filterArgument[0]]);
                break;
            default:
                throw 'Unsupported Compare Operator';
        }
    });

    return subset;
}

module.exports = function () {
    return {
        createGridResponse: createGridResponse,
    };
};
