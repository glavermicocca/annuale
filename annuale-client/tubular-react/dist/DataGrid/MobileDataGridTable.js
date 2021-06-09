"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileDataGridTable = void 0;
var core_1 = require("@material-ui/core");
var GridList_1 = require("@material-ui/core/GridList");
var React = require("react");
var TbMobileRow_1 = require("../BareBones/TbMobileRow");
var useStyles = core_1.makeStyles(function () { return ({
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}); });
var generateOnRowClickProxy = function (onRowClick) {
    return function (row) {
        return function () {
            if (onRowClick) {
                onRowClick(row);
            }
        };
    };
};
var MobileDataGridTable = function (_a) {
    var tbTableInstance = _a.tbTableInstance, rowComponent = _a.rowComponent, onRowClick = _a.onRowClick, detailComponent = _a.detailComponent, rowSelectionEnabled = _a.rowSelectionEnabled, selection = _a.selection;
    var RowComponent = rowComponent ? rowComponent : TbMobileRow_1.TbMobileRow;
    var onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : function (_row) { return void 0; };
    var classes = useStyles();
    return (React.createElement(GridList_1.default, { className: classes.gridList, cellHeight: "auto" }, tbTableInstance.state.data.map(function (row, index) { return (React.createElement(RowComponent, { columns: tbTableInstance.state.columns, row: row, rowIndex: index, onRowClick: onRowClickProxy(row), key: index, detailComponent: detailComponent || null, rowSelectionEnabled: rowSelectionEnabled, selection: selection })); })));
};
exports.MobileDataGridTable = MobileDataGridTable;
