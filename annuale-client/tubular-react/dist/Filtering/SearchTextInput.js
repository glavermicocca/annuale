"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTextInput = void 0;
var FormControl_1 = require("@material-ui/core/FormControl");
var IconButton_1 = require("@material-ui/core/IconButton");
var InputAdornment_1 = require("@material-ui/core/InputAdornment");
var Button_1 = require("@material-ui/core/Button");
var Close_1 = require("@material-ui/icons/Close");
var Search_1 = require("@material-ui/icons/Search");
var Container_1 = require("@material-ui/core/Container");
var CameraAltTwoTone_1 = require("@material-ui/icons/CameraAltTwoTone");
var BarcodeScanner_1 = require("./BarcodeScanner");
var React = require("react");
var TextField_1 = require("@material-ui/core/TextField");
var core_1 = require("@material-ui/core");
var styles = {
    formControl: {
    // marginTop: '0px',
    // marginLeft: '10px',
    // marginRight: '10px',
    // marginBottom: '0px',
    // width: 250,
    },
    buttonCamera: {
    // marginTop: '0px',
    // marginLeft: '10px',
    // marginRight: '10px',
    // marginBottom: '0px',
    },
};
var SearchTextInput = function (_a) {
    var searchText = _a.searchText, updateSearchText = _a.updateSearchText;
    var onChange = function (e) { return updateSearchText(e.target.value); };
    var onClear = function () { return updateSearchText(''); };
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var handleClickOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var adorment = (React.createElement(InputAdornment_1.default, { position: "end" },
        React.createElement(Search_1.default, null)));
    var endAd = (React.createElement(InputAdornment_1.default, { position: "start" },
        searchText !== '' && (React.createElement(IconButton_1.default, { onClick: onClear },
            React.createElement(Close_1.default, null))),
        React.createElement(Button_1.default, { style: styles.buttonCamera, variant: "outlined", color: "secondary", onClick: handleClickOpen },
            React.createElement(CameraAltTwoTone_1.default, null))));
    return (React.createElement(Container_1.default, { maxWidth: "sm" },
        React.createElement(FormControl_1.default, { fullWidth: true },
            React.createElement(TextField_1.default, { style: styles.formControl, size: "medium", variant: "outlined", color: "secondary", type: "text", value: searchText, onChange: onChange, InputProps: { startAdornment: adorment, endAdornment: endAd } }),
            React.createElement(core_1.Dialog, { keepMounted: false, onClose: handleClose, "aria-labelledby": "customized-dialog-title", open: open },
                React.createElement(core_1.DialogContent, { dividers: true },
                    React.createElement(BarcodeScanner_1.default, { onChange: function (value) {
                            updateSearchText(value);
                            handleClose();
                        } })),
                React.createElement(core_1.DialogActions, null,
                    React.createElement(Button_1.default, { variant: "contained", onClick: handleClose, color: "primary" }, "Chiudi"))))));
};
exports.SearchTextInput = SearchTextInput;
