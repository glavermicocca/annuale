"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridToolbar = void 0;
var Toolbar_1 = require("@material-ui/core/Toolbar");
var React = require("react");
var uno_react_1 = require("uno-react");
var SearchTextInput_1 = require("../Filtering/SearchTextInput");
var ExportButton_1 = require("./ExportButton");
var IconButton_1 = require("@material-ui/core/IconButton");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var Tune_1 = require("@material-ui/icons/Tune");
var FeaturesDrawer_1 = require("../DataGrid/FeaturesDrawer");
var tubular_common_1 = require("tubular-common");
var core_1 = require("@material-ui/core");
var mobileSpacer = { flexShrink: 1 };
var spacer = { flex: '1 0' };
var outerWidth = 800;
var timeout = 400;
var GridToolbar = function (_a) {
    var toolbarOptions = _a.toolbarOptions, gridName = _a.gridName, tbTableInstance = _a.tbTableInstance;
    var isMobileResolution = uno_react_1.useResolutionSwitch(outerWidth, timeout)[0];
    var applyFilters = function (columns) {
        columns.forEach(function (fColumn) {
            var column = columns.find(function (c) { return c.name === fColumn.name; });
            if (tubular_common_1.columnHasFilter(fColumn)) {
                column.filterText = fColumn.filterText;
                column.filterOperator = fColumn.filterOperator;
                column.filterArgument = fColumn.filterArgument;
                if (column.filterOperator === tubular_common_1.CompareOperators.Between &&
                    (!column.filterArgument || !column.filterArgument[0])) {
                    column.filterOperator = tubular_common_1.CompareOperators.Gte;
                    column.filterArgument = null;
                }
            }
            else {
                column.filterText = null;
                column.filterOperator = tubular_common_1.CompareOperators.None;
                column.filterArgument = null;
            }
        });
        return columns;
    };
    var onApplyFeatures = function (columns) {
        var newColumns = applyFilters(columns);
        tbTableInstance.api.setColumns(newColumns);
    };
    var _b = uno_react_1.useToggle(false), isPanelOpen = _b[0], togglePanel = _b[1];
    var enableFeaturesDrawer = tbTableInstance.state.columns.find(function (c) { return c.filterable; });
    return (React.createElement(React.Fragment, null,
        React.createElement(Toolbar_1.default, { "data-testid": "grid-toolbar" },
            toolbarOptions.title && React.createElement("h2", null, toolbarOptions.title),
            React.createElement("div", { style: isMobileResolution ? mobileSpacer : spacer }),
            toolbarOptions.customItems,
            toolbarOptions.exportButton && (React.createElement(ExportButton_1.ExportButton, { type: "csv", gridName: gridName, exportTo: tbTableInstance.api.exportTo, filteredRecordCount: tbTableInstance.state.filteredRecordCount, "data-testid": "export-button-csv" })),
            toolbarOptions.printButton && (React.createElement(ExportButton_1.ExportButton, { type: "print", gridName: gridName, exportTo: tbTableInstance.api.exportTo, filteredRecordCount: tbTableInstance.state.filteredRecordCount, "data-testid": "export-button-print" })),
            enableFeaturesDrawer && (React.createElement(Tooltip_1.default, { title: "Grid features" },
                React.createElement(IconButton_1.default, { "aria-label": "Grid features", onClick: togglePanel },
                    React.createElement(Tune_1.default, null))))),
        React.createElement(core_1.Box, { display: "flex", justifyContent: "flex-end" }, toolbarOptions.searchText && (React.createElement(SearchTextInput_1.SearchTextInput, { searchText: tbTableInstance.state.searchText, updateSearchText: tbTableInstance.api.updateSearchText }))),
        enableFeaturesDrawer && isPanelOpen && (React.createElement(FeaturesDrawer_1.FeaturesDrawer, { togglePanel: togglePanel, columns: tbTableInstance.state.columns, onApplyFeatures: onApplyFeatures }))));
};
exports.GridToolbar = GridToolbar;
