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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var lodash_1 = require("lodash");
exports.default = (function (props) {
    var _a = react_1.useState(0), rows = _a[0], setRows = _a[1];
    var _b = react_1.useState(0), marginRight = _b[0], setMarginRight = _b[1];
    var adapt = react_1.useCallback(function () {
        if (props.containerRef.current) {
            var width = props.containerRef.current.clientWidth;
            var rows_1 = Math.floor(width / props.itemWidth);
            if (props.maxRows && rows_1 > props.maxRows) {
                // 一行最多显示${props.maxRows}个
                rows_1 = props.maxRows;
            }
            else if (props.minRows && props.minRows > rows_1) {
                // 一行最少显示${props.minRows}个
                rows_1 = props.minRows;
            }
            setRows(rows_1);
            var margin = (width - rows_1 * props.itemWidth) / (rows_1 - 1);
            setMarginRight(margin);
        }
    }, []);
    var resizeFn = react_1.useCallback(lodash_1.throttle(function () {
        adapt();
    }), []);
    react_1.useEffect(function () {
        adapt();
        window.addEventListener('resize', resizeFn);
        return function () { return window.removeEventListener('resize', resizeFn); };
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null, props.children.map(function (child, index) {
        return (react_1.default.createElement("div", __assign({ key: index }, lodash_1.omit(props, ['itemWidth', 'width', 'children', 'maxRows']), { style: { marginRight: (index + 1) % rows === 0 ? 0 : marginRight, display: 'inline-block' } }), child));
    })));
});
//# sourceMappingURL=index.js.map