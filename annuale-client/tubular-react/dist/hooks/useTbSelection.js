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
exports.useTbSelection = void 0;
var React = require("react");
var createRowSelectionFromData = function (data, columns) {
    var keyColumn = columns.find(function (c) { return c.isKey; }).name;
    var newSelection = {};
    data.forEach(function (row) {
        if (newSelection[row[keyColumn]] === undefined) {
            newSelection[row[keyColumn]] = false;
        }
    });
    return newSelection;
};
var useTbSelection = function (tbInstance, rowSelectionEnabled) {
    var _a = React.useState({}), rowSelection = _a[0], setRowSelection = _a[1];
    var keyColumn = tbInstance.state.columns.find(function (c) { return c.isKey; });
    var toggleRowSelection = function (id) {
        var _a;
        return setRowSelection(__assign(__assign({}, rowSelection), (_a = {}, _a[id] = !rowSelection[id], _a)));
    };
    var getSelectedCount = function () { return Object.keys(rowSelection).filter(function (k) { return rowSelection[k]; }).length; };
    var getUnSelectedCount = function () { return Object.keys(rowSelection).filter(function (k) { return !rowSelection[k]; }).length; };
    var getSelectedRows = function () {
        var selectedKeys = Object.keys(rowSelection).filter(function (k) { return rowSelection[k]; });
        return tbInstance.state.data.filter(function (row) { return selectedKeys.includes("" + row[keyColumn.name]); });
    };
    var isIndeterminateSelection = function () {
        return Object.keys(rowSelection).length > 0 && getSelectedCount() > 0 && getUnSelectedCount() > 0;
    };
    var toggleAllRowsSelection = function () {
        var newRowSelection = createRowSelectionFromData(tbInstance.state.data, tbInstance.state.columns);
        var unSelectedCount = Object.keys(rowSelection).filter(function (k) { return !rowSelection[k]; }).length;
        // all rows are selected
        if (unSelectedCount === 0) {
            Object.keys(rowSelection).forEach(function (f) { return (newRowSelection[f] = false); });
            setRowSelection(newRowSelection);
            return;
        }
        // Indeterminate | non-selected
        Object.keys(rowSelection).forEach(function (f) { return (newRowSelection[f] = true); });
        setRowSelection(newRowSelection);
    };
    React.useEffect(function () {
        if (rowSelectionEnabled) {
            var newSelection = createRowSelectionFromData(tbInstance.state.data, tbInstance.state.columns);
            setRowSelection(newSelection);
        }
    }, [tbInstance.state.data]);
    return {
        rowSelection: rowSelection,
        toggleRowSelection: toggleRowSelection,
        toggleAllRowsSelection: toggleAllRowsSelection,
        getSelectedCount: getSelectedCount,
        getSelectedRows: getSelectedRows,
        getUnSelectedCount: getUnSelectedCount,
        isIndeterminateSelection: isIndeterminateSelection,
    };
};
exports.useTbSelection = useTbSelection;
