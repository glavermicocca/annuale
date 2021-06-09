"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbRow = void 0;
var TableRow_1 = require("@material-ui/core/TableRow");
var React = require("react");
var renders_1 = require("../utils/renders");
var TableCell_1 = require("@material-ui/core/TableCell");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var core_1 = require("@material-ui/core");
var KeyboardArrowRight_1 = require("@material-ui/icons/KeyboardArrowRight");
var KeyboardArrowDown_1 = require("@material-ui/icons/KeyboardArrowDown");
var tubular_react_common_1 = require("tubular-react-common");
var TbRow = function (_a) {
    var row = _a.row, columns = _a.columns, onRowClick = _a.onRowClick, rowSelectionEnabled = _a.rowSelectionEnabled, selection = _a.selection, detailComponent = _a.detailComponent;
    var _b = tubular_react_common_1.useMasterDetails(), open = _b[0], openDetails = _b[1];
    var openMasterDetails = function () {
        openDetails();
    };
    var DetailComponent = detailComponent ? detailComponent : null;
    return (React.createElement(React.Fragment, null,
        React.createElement(TableRow_1.default, { hover: true, onClick: onRowClick },
            detailComponent && (React.createElement(TableCell_1.default, { padding: "checkbox", size: "small", align: "center" },
                React.createElement(core_1.IconButton, { size: "small", onClick: openMasterDetails }, open ? React.createElement(KeyboardArrowDown_1.default, null) : React.createElement(KeyboardArrowRight_1.default, null)))),
            rowSelectionEnabled && selection.rowSelection[row[columns.find(function (c) { return c.isKey; }).name]] !== undefined && (React.createElement(TableCell_1.default, { padding: "checkbox" },
                React.createElement(Checkbox_1.default, { checked: selection.rowSelection[row[columns.find(function (c) { return c.isKey; }).name]], onChange: function () {
                        selection.toggleRowSelection(row[columns.find(function (c) { return c.isKey; }).name]);
                    }, value: selection.rowSelection[row[columns.find(function (c) { return c.isKey; }).name]], inputProps: { 'aria-label': 'select all desserts' } }))),
            renders_1.renderCells(columns, row)),
        detailComponent && open && (React.createElement(TableRow_1.default, { hover: true },
            React.createElement(TableCell_1.default, { colSpan: columns.length + 1 },
                React.createElement(core_1.Collapse, { in: open, timeout: "auto", unmountOnExit: true },
                    React.createElement(DetailComponent, { row: row })))))));
};
exports.TbRow = TbRow;
