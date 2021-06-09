"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var library_1 = require("@zxing/library");
var core_1 = require("@material-ui/core");
var DEVICE_ID = 'DEVICE_ID';
function BarcodeScanner(_a) {
    var onChange = _a.onChange;
    var _b = react_1.useState(null), selectedDeviceId = _b[0], setSelectedDeviceId = _b[1];
    var _c = react_1.useState([]), videoInputDevices = _c[0], setVideoInputDevices = _c[1];
    var codeReader = new library_1.BrowserMultiFormatReader();
    console.log('ZXing code reader initialized');
    react_1.useEffect(function () {
        codeReader
            .listVideoInputDevices()
            .then(function (videoInputDevices) {
            console.log(videoInputDevices);
            setupDevices(videoInputDevices);
        })
            .catch(function (err) {
            console.error(err);
        });
    }, []);
    //const sourceSelect = document.getElementById('sourceSelect') as unknown;
    function setupDevices(videoInputDevices) {
        // selects first device
        if (localStorage.getItem(DEVICE_ID) === null) {
            localStorage.setItem(DEVICE_ID, '' + videoInputDevices[0].deviceId);
            setSelectedDeviceId(videoInputDevices[0].deviceId);
        }
        else {
            setSelectedDeviceId(localStorage.getItem(DEVICE_ID));
        }
        // setup devices dropdown
        if (videoInputDevices.length >= 1) {
            setVideoInputDevices(videoInputDevices);
        }
    }
    function resetClick() {
        codeReader.reset();
    }
    function decodeContinuously(selectedDeviceId) {
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', function (result, err) {
            if (result) {
                console.log(result);
                codeReader.stopContinuousDecode();
                onChange(result.text);
            }
            if (err && !(err instanceof library_1.NotFoundException)) {
                console.error(err);
            }
        });
    }
    react_1.useEffect(function () {
        decodeContinuously(selectedDeviceId);
        console.log("Started decode from camera with id " + selectedDeviceId);
        return function () {
            codeReader.stopContinuousDecode();
            console.log('byebye');
        };
    }, [selectedDeviceId]);
    var handleChange = function (event) {
        setSelectedDeviceId(event.target.value);
        localStorage.setItem(DEVICE_ID, '' + event.target.value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.Grid, { container: true, justify: "center" },
            React.createElement(core_1.Box, { p: 1 },
                React.createElement(core_1.Button, { variant: "outlined", id: "resetButton", onClick: function () { return resetClick(); } }, "Reset")),
            React.createElement(core_1.Box, { p: 1 },
                React.createElement(core_1.Select, { variant: "outlined", value: selectedDeviceId, onChange: handleChange }, videoInputDevices.map(function (element) { return (React.createElement(core_1.MenuItem, { key: element.deviceId, value: element.deviceId }, element.label)); })))),
        React.createElement("video", { id: "video", width: "100%", height: "100%" })));
}
exports.default = BarcodeScanner;
