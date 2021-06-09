"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataGridTable = void 0;
var Table_1 = require("@material-ui/core/Table");
var TableFooter_1 = require("@material-ui/core/TableFooter");
var TableHead_1 = require("@material-ui/core/TableHead");
var React = require("react");
var GridBody_1 = require("./GridBody");
var GridHeader_1 = require("./GridHeader");
var DataGridTable = function (props) {
    var Footer = props.footerComponent;
    return (React.createElement(Table_1.default, { "data-testid": "data-grid-table" },
        React.createElement(TableHead_1.default, null,
            React.createElement(GridHeader_1.GridHeader, { detailComponent: props.detailComponent, tbTableInstance: props.tbTableInstance, rowSelectionEnabled: props.rowSelectionEnabled, selection: props.selection })),
        React.createElement(GridBody_1.GridBody, { tbTableInstance: props.tbTableInstance, rowComponent: props.rowComponent, onRowClick: props.onRowClick, detailComponent: props.detailComponent, rowSelectionEnabled: props.rowSelectionEnabled, selection: props.selection }),
        props.footerComponent && (React.createElement(TableFooter_1.default, null,
            React.createElement(Footer, { aggregates: props.tbTableInstance.state.aggregate })))));
};
exports.DataGridTable = DataGridTable;
