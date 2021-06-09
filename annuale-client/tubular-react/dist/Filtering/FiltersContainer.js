"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersContainer = void 0;
var React = require("react");
var List_1 = require("@material-ui/core/List");
var FilterControl_1 = require("./FilterControl");
var FiltersContainer = function (_a) {
    var columns = _a.columns, onApply = _a.onApply;
    return (React.createElement(List_1.default, { component: "nav" }, columns.map(function (column) { return (React.createElement(FilterControl_1.FilterControl, { column: column, key: column.name, onApply: onApply })); })));
};
exports.FiltersContainer = FiltersContainer;
