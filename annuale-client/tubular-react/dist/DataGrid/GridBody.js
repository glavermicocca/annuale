"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridBody = void 0;
var TableBody_1 = require("@material-ui/core/TableBody");
var React = require("react");
var TbRow_1 = require("../BareBones/TbRow");
var NoDataRow_1 = require("./NoDataRow");
var getStyles = function (isPointer) { return ({
    row: { cursor: isPointer ? 'pointer' : 'auto' },
    title: { paddingLeft: '15px' },
}); };
var generateOnRowClickProxy = function (onRowClick) {
    return function (row) { return function () {
        if (onRowClick) {
            onRowClick(row);
        }
    }; };
};
var GridBody = function (_a) {
    var tbTableInstance = _a.tbTableInstance, rowComponent = _a.rowComponent, onRowClick = _a.onRowClick, detailComponent = _a.detailComponent, rowSelectionEnabled = _a.rowSelectionEnabled, selection = _a.selection;
    var styles = getStyles(Boolean(onRowClick));
    var RowComponent = rowComponent ? rowComponent : TbRow_1.TbRow;
    var onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : function (_row) { return void 0; };
    var state = tbTableInstance.state;
    var columnKey = tbTableInstance.state.columns.find(function (c) { return c.isKey; });
    var content = null;
    if (state.filteredRecordCount === 0 && !state.isLoading) {
        content = React.createElement(NoDataRow_1.NoDataRow, { columns: state.columns, styles: styles });
    }
    else {
        content = state.data.map(function (row, rowIndex) {
            return (React.createElement(RowComponent, { row: row, key: row[columnKey.name], rowIndex: rowIndex, columns: state.columns, detailComponent: detailComponent, onRowClick: onRowClickProxy(row), rowSelectionEnabled: rowSelectionEnabled, selection: selection }));
        });
    }
    return React.createElement(TableBody_1.default, null, content);
};
exports.GridBody = GridBody;
