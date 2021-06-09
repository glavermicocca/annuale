"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericFilter = void 0;
var React = require("react");
var utils_1 = require("./utils");
var tubular_common_1 = require("tubular-common");
// import { ITextStyles } from 'office-ui-fabric-react';
var TextField_1 = require("@material-ui/core/TextField");
var Grid_1 = require("@material-ui/core/Grid");
// const secondInputStyle: ITextStyles = {
//     root: {
//         marginTop: 5,
//     },
// };
var NumericFilter = function (_a) {
    var column = _a.column, onApply = _a.onApply;
    var handleFilterChange = function (isSecondInput) { return function (event) {
        var newValue = event.target.value;
        if (isSecondInput) {
            column.filterArgument = [];
            column.filterArgument[0] = newValue;
        }
        else {
            column.filterText = newValue;
        }
    }; };
    var isBetween = column.filterOperator === tubular_common_1.CompareOperators.Between;
    return (React.createElement(Grid_1.default, { container: true, direction: "column" },
        React.createElement(Grid_1.default, { item: true },
            React.createElement(TextField_1.default, { label: '', type: "number", placeholder: isBetween ? 'From' : 'Type a number', onChange: handleFilterChange(), defaultValue: column.filterText, onKeyDown: utils_1.onKeyDown(onApply) })),
        isBetween && (React.createElement(Grid_1.default, { item: true },
            React.createElement(TextField_1.default, { label: '', type: "number", placeholder: "To", onChange: handleFilterChange(true), defaultValue: column.filterArgument ? column.filterArgument[0] : '', onKeyDown: utils_1.onKeyDown(onApply) })))));
};
exports.NumericFilter = NumericFilter;
