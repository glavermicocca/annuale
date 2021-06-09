"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancePaginationActions = void 0;
var IconButton_1 = require("@material-ui/core/IconButton");
var FirstPage_1 = require("@material-ui/icons/FirstPage");
var KeyboardArrowLeft_1 = require("@material-ui/icons/KeyboardArrowLeft");
var KeyboardArrowRight_1 = require("@material-ui/icons/KeyboardArrowRight");
var LastPage_1 = require("@material-ui/icons/LastPage");
var makeStyles_1 = require("@material-ui/styles/makeStyles");
var React = require("react");
var tubular_common_1 = require("tubular-common");
var Lang_1 = require("../utils/Lang");
var useStyles = makeStyles_1.default({
    root: {
        flexShrink: 0,
    },
});
var AdvancePaginationActions = function (_a) {
    var count = _a.count, isAdvanced = _a.isAdvanced, isLoading = _a.isLoading, page = _a.page, rowsPerPage = _a.rowsPerPage, onChangePage = _a.onChangePage;
    var classes = useStyles({});
    var pages = tubular_common_1.getPages(page, count, rowsPerPage);
    var lastPage = Math.ceil(count / rowsPerPage) - 1;
    var gotoPage = function (value) { return function (e) { return onChangePage(e, value); }; };
    var gotoFirstPage = gotoPage(0);
    var gotoPrevPage = gotoPage(page - 1);
    var gotoNextPage = gotoPage(page + 1);
    var gotoLastPage = gotoPage(Math.max(0, lastPage));
    var canNotBack = page === 0 || isLoading;
    var canNotFwd = page >= lastPage || isLoading;
    return (React.createElement("div", { className: classes.root },
        isAdvanced && (React.createElement(IconButton_1.default, { onClick: gotoFirstPage, disabled: canNotBack, "aria-label": Lang_1.default.translate('FirstPage') },
            React.createElement(FirstPage_1.default, null))),
        React.createElement(IconButton_1.default, { onClick: gotoPrevPage, disabled: canNotBack, "aria-label": Lang_1.default.translate('PrevPage') },
            React.createElement(KeyboardArrowLeft_1.default, null)),
        isAdvanced &&
            pages.map(function (value) { return (React.createElement(IconButton_1.default, { key: value, onClick: gotoPage(value), disabled: value >= Math.ceil(count / rowsPerPage) || isLoading, "aria-label": Lang_1.default.translate('PageNum', value + 1), color: value === page ? 'primary' : 'default' }, value + 1)); }),
        React.createElement(IconButton_1.default, { onClick: gotoNextPage, disabled: canNotFwd, "aria-label": Lang_1.default.translate('NextPage') },
            React.createElement(KeyboardArrowRight_1.default, null)),
        isAdvanced && (React.createElement(IconButton_1.default, { onClick: gotoLastPage, disabled: canNotFwd, "aria-label": Lang_1.default.translate('LastPage') },
            React.createElement(LastPage_1.default, null)))));
};
exports.AdvancePaginationActions = AdvancePaginationActions;
