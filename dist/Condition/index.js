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
var If_1 = __importDefault(require("./If"));
var ElseIf_1 = __importDefault(require("./ElseIf"));
var Else_1 = __importDefault(require("./Else"));
var Condition = function (props) {
    var render = react_1.useMemo(function () {
        var element = null;
        var hasIf = false;
        var children = react_1.default.Children.toArray(props.children);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            hasIf = hasIf || child.type === If_1.default;
            if (child.type === If_1.default && child.props.condition) {
                element = child.props.children;
                break;
            }
            else if (child.type === ElseIf_1.default) {
                if (!hasIf) {
                    console.error('Condition.ElseIf should be used with Condition.If');
                    break;
                }
                if (child.props.condition) {
                    element = child.props.children;
                    break;
                }
            }
            else if (child.type === Else_1.default) {
                if (!hasIf) {
                    console.error('Condition.Else should be used with Condition.If');
                    break;
                }
                element = child.props.children;
                break;
            }
        }
        return element;
    }, [props]);
    return (react_1.default.createElement(react_1.default.Fragment, null, render));
};
Condition.If = If_1.default;
Condition.ElseIf = ElseIf_1.default;
Condition.Else = Else_1.default;
exports.default = Condition;
//# sourceMappingURL=index.js.map