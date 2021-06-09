"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionToolbar = void 0;
var Toolbar_1 = require("@material-ui/core/Toolbar");
var React = require("react");
var clsx_1 = require("clsx");
var Typography_1 = require("@material-ui/core/Typography");
var styles_1 = require("@material-ui/core/styles");
var useToolbarStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight: theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: styles_1.lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
        title: {
            flex: '1 1 100%',
        },
    });
});
var spacer = { flex: '1 0' };
var SelectionToolbar = function (_a) {
    var _b;
    var selection = _a.selection, actionsArea = _a.actionsArea;
    var classes = useToolbarStyles();
    var ActionsArea = actionsArea;
    return (React.createElement(Toolbar_1.default, { "data-testid": "selection-toolbar", className: clsx_1.default(classes.root, (_b = {},
            _b[classes.highlight] = selection.getSelectedCount() > 0,
            _b)) },
        React.createElement(Typography_1.default, { color: "inherit", variant: "subtitle1", component: "div" },
            selection.getSelectedCount(),
            " selected"),
        React.createElement("div", { style: spacer }),
        ActionsArea && React.createElement(ActionsArea, { selection: selection })));
};
exports.SelectionToolbar = SelectionToolbar;
