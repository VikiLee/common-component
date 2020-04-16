"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var defaultUrl = require('@mkt/common-component/dist/LazyImage/default-image.svg');
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}
var throttle = function (func, limit) {
    if (limit === void 0) { limit = 16.6; }
    var inThrottle = false;
    return function () {
        var args = arguments;
        var context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function () { return inThrottle = false; }, limit);
        }
    };
};
exports.default = (function (props) {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    var el = react_1.useRef(null);
    var inViewShow = react_1.useMemo(function () {
        return function () {
            if (el && el.current) {
                var rect = el.current.getBoundingClientRect();
                // 出现在视野的时候加载元素
                if (0 < rect.top && rect.top < getClientHeight()) {
                    setVisible(true);
                    document.removeEventListener('scroll', throttleFn, false);
                }
            }
        };
    }, [el.current]);
    var throttleFn = react_1.useMemo(function () { return throttle(inViewShow); }, [inViewShow]);
    react_1.useEffect(function () {
        if (!el.current) {
            return;
        }
        // 支持IntersectionObserver的使用这个api 
        if ("IntersectionObserver" in window) {
            var lazyCompObserver_1 = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting || entry.intersectionRatio > 0) {
                        setVisible(true);
                        lazyCompObserver_1.unobserve(entry.target);
                    }
                });
            });
            if (el.current && el.current.nodeType === 1) {
                lazyCompObserver_1.observe(el.current);
            }
        }
        else {
            // 不支持的使用getBoundingClientRect和scroll来判断
            inViewShow();
            document.addEventListener('scroll', throttleFn, false);
        }
        return function () { return document.removeEventListener('scroll', throttleFn, false); };
    }, [el.current]);
    return react_1.default.createElement("img", { ref: el, src: visible ? props.src : defaultUrl, width: props.width, height: props.height });
});
//# sourceMappingURL=index.js.map