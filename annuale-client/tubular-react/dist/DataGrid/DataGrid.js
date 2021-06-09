"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataGrid = void 0;
var LinearProgress_1 = require("@material-ui/core/LinearProgress");
var Paper_1 = require("@material-ui/core/Paper");
var Table_1 = require("@material-ui/core/Table");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var makeStyles_1 = require("@material-ui/styles/makeStyles");
var React = require("react");
var tubular_common_1 = require("tubular-common");
var tubular_react_common_1 = require("tubular-react-common");
var uno_react_1 = require("uno-react");
var Pagination_1 = require("../Pagination");
var GridToolbar_1 = require("../Toolbar/GridToolbar");
var ToolbarOptions_1 = require("../Toolbar/ToolbarOptions");
var _1 = require("./");
var MobileDataGridTable_1 = require("./MobileDataGridTable");
var ChipBar_1 = require("../Filtering/ChipBar");
var useTbSelection_1 = require("../hooks/useTbSelection");
var SelectionToolbar_1 = require("../Toolbar/SelectionToolbar");
var useStyles = makeStyles_1.default({
    linearProgress: {
        marginTop: '-10px',
        height: '20px',
    },
    root: {
        overflowX: 'auto',
        width: '100%',
    },
});
var timeout = 400;
var DataGrid = function (props) {
    var columns = props.columns, dataSource = props.dataSource, deps = props.deps, footerComponent = props.footerComponent, gridName = props.gridName, _a = props.mobileBreakpointWidth, mobileBreakpointWidth = _a === void 0 ? props.mobileBreakpointWidth || 800 : _a, onError = props.onError, onRowClick = props.onRowClick, rowComponent = props.rowComponent, rowMobileComponent = props.rowMobileComponent, storage = props.storage, _b = props.toolbarOptions, toolbarOptions = _b === void 0 ? props.toolbarOptions || new ToolbarOptions_1.ToolbarOptions() : _b, detailComponent = props.detailComponent, rowSelectionEnabled = props.rowSelectionEnabled;
    var classes = useStyles({});
    var tbTableInstance = tubular_react_common_1.useTbTable(columns, dataSource, {
        callbacks: { onError: onError },
        componentName: gridName,
        deps: deps,
        pagination: {
            itemsPerPage: toolbarOptions.itemsPerPage,
        },
        storage: storage,
    });
    var isMobileResolution = uno_react_1.useResolutionSwitch(mobileBreakpointWidth, timeout)[0];
    var selection = useTbSelection_1.useTbSelection(tbTableInstance, rowSelectionEnabled);
    var showSelectionToolbar = rowSelectionEnabled && selection.getSelectedCount() > 0;
    var showGridToolbar = toolbarOptions.advancePagination == false &&
        toolbarOptions.enablePagination == false &&
        toolbarOptions.exportButton == false &&
        toolbarOptions.printButton == false &&
        toolbarOptions.searchText == false;
    if (isMobileResolution) {
        //toolbarOptions.SetMobileMode();
        var applyOrResetFilter_1 = function (columnName, value) {
            var newColumns = tbTableInstance.state.columns.map(function (column) {
                if (column.name === columnName) {
                    return __assign(__assign({}, column), { filterText: value, filterOperator: !!value ? tubular_common_1.CompareOperators.Equals : tubular_common_1.CompareOperators.None, filterArgument: !!value ? [] : null });
                }
                return column;
            });
            tbTableInstance.api.setColumns(newColumns);
        };
        return (React.createElement(Paper_1.default, { className: classes.root },
            !showSelectionToolbar && !showGridToolbar && (React.createElement(GridToolbar_1.GridToolbar, { toolbarOptions: toolbarOptions, tbTableInstance: tbTableInstance, gridName: gridName })),
            showSelectionToolbar && (React.createElement(SelectionToolbar_1.SelectionToolbar, { selection: selection, actionsArea: toolbarOptions.actionsArea })),
            React.createElement("div", { className: classes.linearProgress, "data-testid": "linear-progress" }, tbTableInstance.state.isLoading && React.createElement(LinearProgress_1.default, null)),
            React.createElement(ChipBar_1.ChipBar, { columns: tbTableInstance.state.columns, onClearFilter: applyOrResetFilter_1 }),
            React.createElement(MobileDataGridTable_1.MobileDataGridTable, { tbTableInstance: tbTableInstance, onRowClick: onRowClick, rowComponent: rowMobileComponent, detailComponent: detailComponent || null, rowSelectionEnabled: rowSelectionEnabled, selection: selection }),
            toolbarOptions.enablePagination && (React.createElement(Pagination_1.Paginator, { advancePagination: toolbarOptions.advancePagination, rowsPerPageOptions: toolbarOptions.rowsPerPageOptions, tbTableInstance: tbTableInstance }))));
    }
    var paginator = (React.createElement(Table_1.default, { "data-testid": "paginator" },
        React.createElement(TableHead_1.default, null,
            React.createElement(TableRow_1.default, null,
                React.createElement(Pagination_1.Paginator, { advancePagination: toolbarOptions.advancePagination, rowsPerPageOptions: toolbarOptions.rowsPerPageOptions, tbTableInstance: tbTableInstance })))));
    var applyOrResetFilter = function (columnName, value) {
        var newColumns = tbTableInstance.state.columns.map(function (column) {
            if (column.name === columnName) {
                return __assign(__assign({}, column), { filterText: value, filterOperator: !!value ? tubular_common_1.CompareOperators.Equals : tubular_common_1.CompareOperators.None, filterArgument: !!value ? [] : null });
            }
            return column;
        });
        tbTableInstance.api.setColumns(newColumns);
    };
    return (React.createElement(Paper_1.default, { className: classes.root },
        !showSelectionToolbar && (React.createElement(GridToolbar_1.GridToolbar, { toolbarOptions: toolbarOptions, tbTableInstance: tbTableInstance, gridName: gridName })),
        showSelectionToolbar && (React.createElement(SelectionToolbar_1.SelectionToolbar, { selection: selection, actionsArea: toolbarOptions.actionsArea })),
        React.createElement("div", { className: classes.linearProgress, "data-testid": "linear-progress" }, tbTableInstance.state.isLoading && React.createElement(LinearProgress_1.default, null)),
        React.createElement(ChipBar_1.ChipBar, { columns: tbTableInstance.state.columns, onClearFilter: applyOrResetFilter }),
        React.createElement(_1.DataGridTable, { tbTableInstance: tbTableInstance, rowComponent: rowComponent, footerComponent: footerComponent, detailComponent: detailComponent || null, onRowClick: onRowClick, rowSelectionEnabled: rowSelectionEnabled, selection: selection }),
        toolbarOptions.enablePagination && paginator));
};
exports.DataGrid = DataGrid;
