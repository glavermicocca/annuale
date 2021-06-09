"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbMobileRow = void 0;
var React = require("react");
var DataGrid_1 = require("../DataGrid");
var TbMobileRow = function (_a) {
    var columns = _a.columns, onRowClick = _a.onRowClick, row = _a.row, rowSelectionEnabled = _a.rowSelectionEnabled, selection = _a.selection, detailComponent = _a.detailComponent;
    return (React.createElement(DataGrid_1.DataGridCard, { columns: columns, item: row, onClickCallback: onRowClick, rowSelectionEnabled: rowSelectionEnabled, selection: selection, detailComponent: detailComponent }));
};
exports.TbMobileRow = TbMobileRow;
