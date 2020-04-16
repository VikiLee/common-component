"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("@mkt/common-component/dist/Loading/style.min.css");
exports.default = (function () {
    return (react_1.default.createElement("div", { className: "container loading-wrapper" },
        react_1.default.createElement("div", { className: "page-loadding" },
            react_1.default.createElement("div", { className: "spinning-ring" }),
            react_1.default.createElement("div", { className: "spinning-s" }))));
});
//# sourceMappingURL=index.js.map