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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesDrawer = void 0;
var React = require("react");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var Typography_1 = require("@material-ui/core/Typography");
var Box_1 = require("@material-ui/core/Box");
var Drawer_1 = require("@material-ui/core/Drawer");
var FiltersContainer_1 = require("../Filtering/FiltersContainer");
var FilterList_1 = require("@material-ui/icons/FilterList");
var tubular_common_1 = require("tubular-common");
var core_1 = require("@material-ui/core");
var useStyles = core_1.makeStyles({
    tabPanel: {
        // It seems the appbar for tabs will always be 72px
        height: 'calc(100% - 72px)',
        overflow: 'auto',
    },
    mainWrapper: {
        height: '100%',
        width: 400,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    featureContainer: {
        overflow: 'hidden',
    },
    actionsArea: {
        paddingTop: 20,
    },
});
var TabPanel = function (props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    var classes = useStyles();
    return (React.createElement(Typography_1.default, __assign({ component: "div", role: "tabpanel", hidden: value !== index, id: "wrapped-tabpanel-" + index, "aria-labelledby": "wrapped-tab-" + index, className: classes.tabPanel }, other),
        React.createElement(Box_1.default, { p: 3 }, children)));
};
var resolveFilterOperator = function (column) {
    return (column.filterOperator =
        column.filterOperator === tubular_common_1.CompareOperators.None
            ? column.dataType === tubular_common_1.ColumnDataType.String
                ? tubular_common_1.CompareOperators.Contains
                : tubular_common_1.CompareOperators.Equals
            : column.filterOperator);
};
var copyColumns = function (columns) {
    return columns.map(function (column) { return (__assign(__assign({}, column), { filterOperator: resolveFilterOperator(column) })); });
};
var FeaturesDrawer = function (_a) {
    var columns = _a.columns, onApplyFeatures = _a.onApplyFeatures, togglePanel = _a.togglePanel;
    var tempColumns = copyColumns(columns);
    var classes = useStyles();
    var _b = React.useState('filters'), value = _b[0], setValue = _b[1];
    var handleChange = function (_event, newValue) {
        setValue(newValue);
    };
    var onApplyClick = function () {
        onApplyFeatures(tempColumns);
        togglePanel();
    };
    return (React.createElement(Drawer_1.default, { anchor: "right", open: true },
        React.createElement(core_1.Grid, { role: "presentation", className: classes.mainWrapper, container: true, direction: "column", justify: "space-between", wrap: "nowrap", style: { height: '100%' } },
            React.createElement(core_1.Grid, { item: true, className: classes.featureContainer },
                React.createElement(core_1.AppBar, { position: "static" },
                    React.createElement(Tabs_1.default, { value: value, onChange: handleChange, "aria-label": "wrapped label tabs example" },
                        React.createElement(Tab_1.default, { value: "filters", icon: React.createElement(FilterList_1.default, null), label: "Filters" }))),
                React.createElement(TabPanel, { value: value, index: "filters" },
                    React.createElement(FiltersContainer_1.FiltersContainer, { columns: tempColumns.filter(function (c) { return c.filterable; }), onApply: onApplyClick }))),
            React.createElement(core_1.Grid, { container: true, className: classes.actionsArea, item: true, direction: "row" },
                React.createElement(core_1.Button, { variant: "contained", color: "primary", onClick: onApplyClick }, "Apply"),
                React.createElement(core_1.Button, { variant: "outlined", color: "secondary", onClick: togglePanel, style: { marginLeft: 10 } }, "Cancel")))));
};
exports.FeaturesDrawer = FeaturesDrawer;
