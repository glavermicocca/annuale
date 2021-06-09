"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCells = exports.renderDefaultListItem = exports.renderCellContent = exports.formatDateTime = exports.formatDate = void 0;
var TableCell_1 = require("@material-ui/core/TableCell");
var CheckBox_1 = require("@material-ui/icons/CheckBox");
var CheckBoxOutlineBlank_1 = require("@material-ui/icons/CheckBoxOutlineBlank");
var React = require("react");
var tubular_common_1 = require("tubular-common");
var formatDate = function (date) {
    return date.toLocaleString('en-us', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};
exports.formatDate = formatDate;
var formatDateTime = function (date) {
    return date.toLocaleString('en-us', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
exports.formatDateTime = formatDateTime;
var renderCellContent = function (column, row) {
    var value = row[column.name];
    switch (column.dataType) {
        case tubular_common_1.ColumnDataType.Numeric:
            return value || 0;
        case tubular_common_1.ColumnDataType.Date:
        case tubular_common_1.ColumnDataType.DateTime:
        case tubular_common_1.ColumnDataType.DateTimeUtc:
            var dateAsString = !value ? '' : tubular_common_1.parseDateColumnValue(column, value);
            return dateAsString;
        case tubular_common_1.ColumnDataType.Boolean:
            return value === true ? React.createElement(CheckBox_1.default, null) : React.createElement(CheckBoxOutlineBlank_1.default, null);
        default:
            return value;
    }
};
exports.renderCellContent = renderCellContent;
var renderDefaultListItem = function (columns, row) {
    return columns
        .filter(function (col) { return col.visible; })
        .map(function (column) { return React.createElement("div", { key: column.name }, exports.renderCellContent(column, row)); });
};
exports.renderDefaultListItem = renderDefaultListItem;
var renderCells = function (columns, row) {
    return columns
        .filter(function (col) { return col.visible; })
        .map(function (column) { return (React.createElement(TableCell_1.default, { key: column.name, padding: column.label === '' ? 'none' : 'default', align: tubular_common_1.getColumnAlign(column) }, exports.renderCellContent(column, row))); });
};
exports.renderCells = renderCells;
