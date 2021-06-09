"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardFilterEditor = void 0;
var React = require("react");
var tubular_common_1 = require("tubular-common");
var utils_1 = require("./utils");
var ArrowDropDown_1 = require("@material-ui/icons/ArrowDropDown");
var Grid_1 = require("@material-ui/core/Grid");
var Button_1 = require("@material-ui/core/Button");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var Menu_1 = require("@material-ui/core/Menu");
var NumericFilter_1 = require("./NumericFilter");
var StringFilter_1 = require("./StringFilter");
var DateFilter_1 = require("./DateFilter");
var getFilterControl = function (column, onApply) {
    switch (column.dataType) {
        case tubular_common_1.ColumnDataType.Numeric:
            return React.createElement(NumericFilter_1.NumericFilter, { column: column, onApply: onApply });
        case tubular_common_1.ColumnDataType.String:
            return React.createElement(StringFilter_1.StringFilter, { column: column, onApply: onApply });
        case tubular_common_1.ColumnDataType.Date:
        case tubular_common_1.ColumnDataType.DateTime:
        case tubular_common_1.ColumnDataType.DateTimeUtc:
            return React.createElement(DateFilter_1.DateFilter, { column: column, onApply: onApply });
        default:
            return null;
    }
};
var StandardFilterEditor = function (_a) {
    var column = _a.column, onApply = _a.onApply;
    var _b = React.useState(column.filterOperator), currentOperator = _b[0], setCurrentOperator = _b[1];
    var _c = React.useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var options = tubular_common_1.getOperators(column).map(function (row) { return ({
        key: row.value,
        icon: utils_1.getOperatorIcon(column.filterOperator),
        text: utils_1.getOperatorText(row.value, row.title),
    }); });
    var handleClose = function () {
        setAnchorEl(null);
    };
    var handleMenuClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleOperatorClick = function (operator) {
        setCurrentOperator(operator);
        column.filterOperator = operator;
        handleClose();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Grid_1.default, { container: true, spacing: 2 },
            React.createElement(Grid_1.default, { item: true, xs: 3, container: true, justify: "center", direction: "column" },
                React.createElement(Button_1.default, { variant: "outlined", color: "primary", size: "small", "aria-controls": open ? 'split-button-menu' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-label": "select merge strategy", "aria-haspopup": "menu", onClick: handleMenuClick },
                    utils_1.getOperatorIcon(currentOperator),
                    React.createElement(ArrowDropDown_1.default, null))),
            React.createElement(Grid_1.default, { item: true, xs: 9 }, getFilterControl(column, onApply))),
        React.createElement(Menu_1.default, { id: "split-button-menu", open: Boolean(anchorEl), onClose: handleClose, anchorEl: anchorEl }, options.map(function (option) { return (React.createElement(MenuItem_1.default, { key: option.text, selected: currentOperator === option.key, onClick: function () { return handleOperatorClick(option.key); } },
            utils_1.getOperatorIcon(option.key),
            React.createElement("span", { style: { marginLeft: 10 } }, option.text))); }))));
};
exports.StandardFilterEditor = StandardFilterEditor;
