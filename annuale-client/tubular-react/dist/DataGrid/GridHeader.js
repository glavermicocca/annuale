"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridHeader = void 0;
var TableCell_1 = require("@material-ui/core/TableCell");
var TableRow_1 = require("@material-ui/core/TableRow");
var React = require("react");
var GridHeaderCell_1 = require("./GridHeaderCell");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var GridHeader = function (_a) {
    var tbTableInstance = _a.tbTableInstance, detailComponent = _a.detailComponent, rowSelectionEnabled = _a.rowSelectionEnabled, selection = _a.selection;
    var api = tbTableInstance.api, state = tbTableInstance.state;
    return (React.createElement(TableRow_1.default, null,
        detailComponent && React.createElement(TableCell_1.default, { key: "Detail", padding: "default" }),
        rowSelectionEnabled && (React.createElement(TableCell_1.default, { padding: "checkbox" },
            React.createElement(Checkbox_1.default, { indeterminate: selection.isIndeterminateSelection(), checked: selection.getUnSelectedCount() === 0 && tbTableInstance.state.data.length > 0, onChange: selection.toggleAllRowsSelection, inputProps: { 'aria-label': 'select all desserts' } }))),
        state.columns
            .filter(function (col) { return col.visible; })
            .map(function (column) { return (React.createElement(GridHeaderCell_1.GridHeaderCell, { key: column.name, column: column, sortColumn: api.sortColumn })); })));
};
exports.GridHeader = GridHeader;
