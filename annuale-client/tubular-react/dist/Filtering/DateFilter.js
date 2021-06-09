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
exports.DateFilter = void 0;
require("date-fns");
var React = require("react");
var Grid_1 = require("@material-ui/core/Grid");
var date_fns_1 = require("@date-io/date-fns");
var pickers_1 = require("@material-ui/pickers");
var tubular_common_1 = require("tubular-common");
var core_1 = require("@material-ui/core");
var getInitialDates = function (column) {
    var dates = [null, null];
    var startDate = Date.parse(column.filterText);
    if (!isNaN(startDate)) {
        dates[0] = new Date(startDate);
    }
    var toDate = Date.parse(column.filterArgument && column.filterArgument[0] ? column.filterArgument[0].toString() : null);
    if (!isNaN(startDate)) {
        dates[1] = new Date(toDate);
    }
    return dates;
};
var DateFilter = function (_a) {
    var column = _a.column;
    var _b = React.useState(getInitialDates(column)), dates = _b[0], setDates = _b[1];
    var handleDateChange = function (isSecondInput) { return function (date) {
        var normalizedDate = !!date ? date : null;
        if (isSecondInput) {
            column.filterArgument = [];
            setDates([dates[0], normalizedDate]);
            column.filterArgument[0] = normalizedDate ? normalizedDate.toISOString() : null;
        }
        else {
            setDates([normalizedDate, dates[1]]);
            column.filterText = normalizedDate ? normalizedDate.toISOString() : null;
        }
    }; };
    var isBetween = column.filterOperator === tubular_common_1.CompareOperators.Between;
    return (React.createElement(pickers_1.LocalizationProvider, { dateAdapter: date_fns_1.default },
        React.createElement(Grid_1.default, { container: true, direction: "column" },
            React.createElement(Grid_1.default, { item: true },
                React.createElement(pickers_1.DatePicker, { label: isBetween ? 'From' : 'Select a date', value: dates[0], onChange: handleDateChange(), renderInput: function (props) { return React.createElement(core_1.TextField, __assign({}, props)); } })),
            column.filterOperator === tubular_common_1.CompareOperators.Between && (React.createElement(Grid_1.default, { item: true },
                React.createElement(pickers_1.DatePicker, { label: "To", value: dates[1], onChange: handleDateChange(true), renderInput: function (props) { return React.createElement(core_1.TextField, __assign({}, props)); } }))))));
};
exports.DateFilter = DateFilter;
