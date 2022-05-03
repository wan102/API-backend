"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./../utils/common");
var core_1 = require("../core");
var util_1 = require("./util");
/**
 * List contains condition
 *
 *  @author Dilip Kola <dilip@tensult.com>
 */
var ListContainsCondition = /** @class */ (function () {
    function ListContainsCondition() {
    }
    ListContainsCondition.prototype.evaluate = function (args, context) {
        if (!args) {
            return true;
        }
        if (!context) {
            return false;
        }
        if (common_1.CommonUtil.type(args) !== "object") {
            throw new core_1.AccessControlError("ListContainsCondition expects type of args to be object");
        }
        return Object.keys(args).every(function (key) {
            var keyValue = key.startsWith("$.")
                ? util_1.ConditionUtil.getValueByPath(context, key)
                : context[key];
            return (keyValue &&
                Array.isArray(keyValue) &&
                common_1.CommonUtil.matchesAnyElement(args[key], function (elm) {
                    return keyValue.includes(util_1.ConditionUtil.getValueByPath(context, elm));
                }));
        });
    };
    return ListContainsCondition;
}());
exports.ListContainsCondition = ListContainsCondition;
