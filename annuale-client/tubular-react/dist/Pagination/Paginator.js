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
exports.Paginator = void 0;
var styles_1 = require("@material-ui/core/styles");
var TablePagination_1 = require("@material-ui/core/TablePagination");
var React = require("react");
var uno_react_1 = require("uno-react");
var AdvancePaginationActions_1 = require("./AdvancePaginationActions");
var Lang_1 = require("../utils/Lang");
var useStyles = styles_1.makeStyles({
    caption: {
    // flexShrink: 1,
    // height: '55px',
    },
    root: {
    // height: '75px',
    // maxWidth: '95%',
    },
});
var outerWidth = 800;
var timeout = 400;
var message = function (totalRecordCount, filteredRecordCount) { return function (_a) {
    var from = _a.from, to = _a.to, count = _a.count;
    return totalRecordCount === filteredRecordCount
        ? Lang_1.default.translate('Pages', from, to, count)
        : filteredRecordCount === 0
            ? Lang_1.default.translate('NoRecords')
            : Lang_1.default.translate('TotalRecords', from, to, count, totalRecordCount);
}; };
var Paginator = function (_a) {
    var tbTableInstance = _a.tbTableInstance, rowsPerPageOptions = _a.rowsPerPageOptions, advancePagination = _a.advancePagination;
    var isMobileResolution = uno_react_1.useResolutionSwitch(outerWidth, timeout)[0];
    var classes = useStyles({});
    var state = tbTableInstance.state, api = tbTableInstance.api;
    if (!state.itemsPerPage) {
        return null;
    }
    var newProps = {
        count: state.filteredRecordCount,
        labelDisplayedRows: message(state.totalRecordCount, state.filteredRecordCount),
        onChangePage: function (_e, page) { return api.goToPage(page); },
        onChangeRowsPerPage: function (e) { return api.updateItemsPerPage(Number(e.target.value)); },
        page: state.filteredRecordCount > 0 ? state.page : 0,
        rowsPerPage: state.itemsPerPage,
        rowsPerPageOptions: rowsPerPageOptions || [10, 20, 50],
    };
    // eslint-disable-next-line react/display-name
    newProps.ActionsComponent = function () { return (React.createElement(AdvancePaginationActions_1.AdvancePaginationActions, { count: newProps.count, isAdvanced: advancePagination, isLoading: newProps.isLoading, onChangePage: newProps.onChangePage, page: newProps.page, rowsPerPage: newProps.rowsPerPage })); };
    return (React.createElement(TablePagination_1.default, __assign({ classes: {
            caption: isMobileResolution && classes.caption,
            root: classes.root,
        } }, newProps)));
};
exports.Paginator = Paginator;
