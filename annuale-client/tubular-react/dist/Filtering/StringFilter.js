"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFilter = void 0;
var React = require("react");
var TextField_1 = require("@material-ui/core/TextField");
var utils_1 = require("./utils");
var StringFilter = function (_a) {
    var column = _a.column, onApply = _a.onApply;
    return (React.createElement(React.Fragment, null,
        React.createElement(TextField_1.default, { label: '', onChange: utils_1.handleFilterChange(column), defaultValue: column.filterText, onKeyDown: utils_1.onKeyDown(onApply) })));
};
exports.StringFilter = StringFilter;
