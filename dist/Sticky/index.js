"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var throttle_1 = __importDefault(require("lodash/throttle"));
require("./index.css");
var getWebViewType = function () {
    var result = {
        _isInWKWebView: false,
        _isInUIWebView: false,
        _others: false
    };
    if (navigator.platform.substr(0, 2) === 'iP') {
        //iOS (iPhone, iPod or iPad)
        var lte9 = /constructor/i.test(HTMLElement.toString());
        var nav = window.navigator;
        var ua = nav.userAgent;
        var idb = !!window.indexedDB;
        if (ua.indexOf('Safari') !== -1 && ua.indexOf('Versionpn') !== -1 && !nav.standalone) {
            result._others = true;
        }
        else if ((!idb && lte9) || !window.statusbar.visible) {
            result._isInUIWebView = true;
        }
        else if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb) {
            result._isInWKWebView = true;
        }
    }
    return result;
};
var getWindowScrollTop = function () {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
};
var Sticky = function (_a) {
    var children = _a.children, top = _a.top;
    var _b = react_1.useState(''), fixedClass = _b[0], setFixedClass = _b[1];
    var _c = react_1.useState(0), ctnHeight = _c[0], setCtnHeight = _c[1];
    react_1.useEffect(function () {
        var $ctn = window.document.querySelector('.sticky-container');
        var $innerCtn = window.document.querySelector('.sticky-inner-container');
        var commonHandler = throttle_1.default(function () {
            var scrollTop = getWindowScrollTop() + (top || 0);
            setFixedClass(scrollTop > $ctn.offsetTop ? 'fixed' : '');
        }, 30);
        var iOSUIWebViewHandler = function () {
            var scrollTop = getWindowScrollTop() + (top || 0);
            var shouldBeFixed = scrollTop > $ctn.offsetTop;
            setFixedClass(getWindowScrollTop() > $ctn.offsetTop ? 'fixed' : '');
            $innerCtn.style.position = shouldBeFixed ? 'fixed' : 'relative';
            $innerCtn.style.top = top ? top + "px" : '0px';
        };
        var onScroll = function () {
            getWebViewType()._isInUIWebView ? iOSUIWebViewHandler() : commonHandler();
        };
        getWebViewType()._isInUIWebView
            ? window.onscroll = onScroll
            : window.addEventListener('scroll', onScroll);
        return function () {
            window.removeEventListener('scroll', onScroll);
            window.onscroll = null;
        };
    }, []);
    react_1.useEffect(function () {
        var $innerCtn = window.document.querySelector('.sticky-inner-container');
        setCtnHeight($innerCtn.offsetHeight);
    }, []);
    return (react_1.default.createElement("div", { className: "sticky-container", style: { height: ctnHeight + "px" } },
        react_1.default.createElement("div", { className: "sticky-inner-container " + fixedClass, style: { top: top || 0 } }, children)));
};
exports.default = Sticky;
//# sourceMappingURL=index.js.map