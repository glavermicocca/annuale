"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarOptions = void 0;
var ToolbarOptions = /** @class */ (function () {
    function ToolbarOptions(options) {
        this.advancePagination = true;
        this.enablePagination = true;
        this.exportButton = true;
        this.printButton = true;
        this.searchText = true;
        this.rowsPerPageOptions = [10, 20, 50, 100];
        this.itemsPerPage = 10;
        this.title = '';
        Object.assign(this, options);
    }
    ToolbarOptions.prototype.SetMobileMode = function () {
        this.advancePagination = false;
        this.enablePagination = false;
        this.exportButton = false;
        this.printButton = false;
        this.rowsPerPageOptions = [5, 10];
    };
    return ToolbarOptions;
}());
exports.ToolbarOptions = ToolbarOptions;
