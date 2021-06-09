"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperatorIcon = exports.getOperatorText = exports.onKeyDown = exports.handleFilterChange = void 0;
var React = require("react");
var tubular_common_1 = require("tubular-common");
var TbNotContainsIcon_1 = require("../SvgIcons/TbNotContainsIcon");
var TbContainsIcon_1 = require("../SvgIcons/TbContainsIcon");
var TbStartsWithIcon_1 = require("../SvgIcons/TbStartsWithIcon");
var TbNotStartsWithIcon_1 = require("../SvgIcons/TbNotStartsWithIcon");
var TbEndsWithIcon_1 = require("../SvgIcons/TbEndsWithIcon");
var TbNotEndsWithIcon_1 = require("../SvgIcons/TbNotEndsWithIcon");
var TbEqualsIcon_1 = require("../SvgIcons/TbEqualsIcon");
var TbGreaterThanIcon_1 = require("../SvgIcons/TbGreaterThanIcon");
var TbNotEqualsIcon_1 = require("../SvgIcons/TbNotEqualsIcon");
var TbGreaterOrEqualsToIcon_1 = require("../SvgIcons/TbGreaterOrEqualsToIcon");
var TbLessThanIcon_1 = require("../SvgIcons/TbLessThanIcon");
var TbLessOrEqualsToIcon_1 = require("../SvgIcons/TbLessOrEqualsToIcon");
var TbBetweenIcon_1 = require("../SvgIcons/TbBetweenIcon");
var FilterList_1 = require("@material-ui/icons/FilterList");
var handleFilterChange = function (column) { return function (event) {
    column.filterText = event.target.value;
}; };
exports.handleFilterChange = handleFilterChange;
var onKeyDown = function (onEnter) { return function (ev) {
    if (ev.keyCode === 13 && onEnter) {
        ev.preventDefault();
        ev.stopPropagation();
        onEnter();
    }
}; };
exports.onKeyDown = onKeyDown;
var getOperatorText = function (value, title) {
    switch (value) {
        case tubular_common_1.CompareOperators.NotContains:
        case tubular_common_1.CompareOperators.Contains:
        case tubular_common_1.CompareOperators.StartsWith:
        case tubular_common_1.CompareOperators.NotStartsWith:
        case tubular_common_1.CompareOperators.EndsWith:
        case tubular_common_1.CompareOperators.NotEndsWith:
        case tubular_common_1.CompareOperators.Equals:
        case tubular_common_1.CompareOperators.NotEquals:
        case tubular_common_1.CompareOperators.Between:
            return title;
        case tubular_common_1.CompareOperators.Gt:
            return 'Greater than';
        case tubular_common_1.CompareOperators.Gte:
            return 'Greater than or equals to';
        case tubular_common_1.CompareOperators.Lt:
            return 'Less than';
        case tubular_common_1.CompareOperators.Lte:
            return 'Less than or equals to';
        default:
            return 'None';
    }
};
exports.getOperatorText = getOperatorText;
var getOperatorIcon = function (operator) {
    switch (operator) {
        case tubular_common_1.CompareOperators.NotContains:
            return React.createElement(TbNotContainsIcon_1.TbNotContainsIcon, null);
        case tubular_common_1.CompareOperators.Contains:
            return React.createElement(TbContainsIcon_1.TbContainsIcon, null);
        case tubular_common_1.CompareOperators.StartsWith:
            return React.createElement(TbStartsWithIcon_1.TbStartsWithIcon, null);
        case tubular_common_1.CompareOperators.NotStartsWith:
            return React.createElement(TbNotStartsWithIcon_1.TbNotStartsWithIcon, null);
        case tubular_common_1.CompareOperators.EndsWith:
            return React.createElement(TbEndsWithIcon_1.TbEndsWithIcon, null);
        case tubular_common_1.CompareOperators.NotEndsWith:
            return React.createElement(TbNotEndsWithIcon_1.TbNotEndsWithIcon, null);
        case tubular_common_1.CompareOperators.Equals:
            return React.createElement(TbEqualsIcon_1.TbEqualsIcon, null);
        case tubular_common_1.CompareOperators.NotEquals:
            return React.createElement(TbNotEqualsIcon_1.TbNotEqualsIcon, null);
        case tubular_common_1.CompareOperators.Gt:
            return React.createElement(TbGreaterThanIcon_1.TbGreaterThanIcon, null);
        case tubular_common_1.CompareOperators.Gte:
            return React.createElement(TbGreaterOrEqualsToIcon_1.TbGreaterOrEqualsToIcon, null);
        case tubular_common_1.CompareOperators.Lt:
            return React.createElement(TbLessThanIcon_1.TbLessThanIcon, null);
        case tubular_common_1.CompareOperators.Lte:
            return React.createElement(TbLessOrEqualsToIcon_1.TbLessOrEqualsToIcon, null);
        case tubular_common_1.CompareOperators.Between:
            return React.createElement(TbBetweenIcon_1.TbBetweenIcon, null);
        default:
            return React.createElement(FilterList_1.default, null);
    }
};
exports.getOperatorIcon = getOperatorIcon;
