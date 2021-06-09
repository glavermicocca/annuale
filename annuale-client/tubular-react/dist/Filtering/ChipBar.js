"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipBar = void 0;
var React = require("react");
var tubular_common_1 = require("tubular-common");
var ChipFilter_1 = require("./ChipFilter");
var ChipBar = function (_a) {
    var columns = _a.columns, onClearFilter = _a.onClearFilter;
    var filteredColumns = columns.filter(function (c) { return tubular_common_1.columnHasFilter(c) && c.filterable; });
    var onRemove = function (columnName) { return function () { return onClearFilter(columnName); }; };
    return (React.createElement("div", null, filteredColumns.map(function (column) { return (React.createElement(ChipFilter_1.ChipFilter, { key: column.name, column: column, onRemoveFilter: onRemove(column.name) })); })));
};
exports.ChipBar = ChipBar;
