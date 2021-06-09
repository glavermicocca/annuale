"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipFilter = void 0;
var React = require("react");
var tubular_common_1 = require("tubular-common");
var Chip_1 = require("@material-ui/core/Chip");
var utils_1 = require("./utils");
var styles_1 = require("@material-ui/core/styles");
var CheckBox_1 = require("@material-ui/icons/CheckBox");
var CheckBoxOutlineBlank_1 = require("@material-ui/icons/CheckBoxOutlineBlank");
var convertToFriendlyDateString = function (date) { return new Date(date).toDateString(); };
var getFilterText = function (column) {
    var isDate = column.dataType === tubular_common_1.ColumnDataType.Date ||
        column.dataType === tubular_common_1.ColumnDataType.DateTime ||
        column.dataType === tubular_common_1.ColumnDataType.DateTimeUtc;
    var filterText = isDate ? convertToFriendlyDateString(column.filterText) : column.filterText;
    if (column.filterOperator === tubular_common_1.CompareOperators.Between) {
        var argument = column.filterArgument[0];
        if (isDate) {
            argument = convertToFriendlyDateString(argument);
        }
        return filterText + " - " + argument;
    }
    if (column.dataType === tubular_common_1.ColumnDataType.Boolean) {
        return filterText === 'true' ? React.createElement(CheckBox_1.default, null) : React.createElement(CheckBoxOutlineBlank_1.default, null);
    }
    return filterText;
};
var useStyles = styles_1.makeStyles({
    root: {
        marginRight: 6,
    },
    label: {
        display: 'flex',
        alignItems: 'center',
    },
});
var ChipFilter = function (_a) {
    var column = _a.column, onRemoveFilter = _a.onRemoveFilter;
    var filterValue = getFilterText(column);
    var classes = useStyles();
    var labelNode = (React.createElement(React.Fragment, null,
        React.createElement("span", { style: { marginRight: 4 } }, column.label),
        utils_1.getOperatorIcon(column.filterOperator),
        React.createElement("span", { style: { marginLeft: 4 } }, filterValue)));
    return React.createElement(Chip_1.default, { classes: classes, label: labelNode, onDelete: function () { return onRemoveFilter(column.name); } });
};
exports.ChipFilter = ChipFilter;
