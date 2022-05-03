"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./../utils/");
var core_1 = require("../core");
var util_1 = require("./util");
/**
 * Starts with condition
 *
 *  @author Dilip Kola <dilip@tensult.com>
 */
var StartsWithCondition = /** @class */ (function () {
    function StartsWithCondition() {
    }
    StartsWithCondition.prototype.evaluate = function (args, context) {
        if (!args) {
            return true;
        }
        if (!context) {
            return false;
        }
        if (utils_1.CommonUtil.type(args) !== "object") {
            throw new core_1.AccessControlError("StartsWithCondition expects type of args to be object");
        }
        return Object.keys(args).every(function (key) {
            var keyValue = key.startsWith("$.")
                ? util_1.ConditionUtil.getValueByPath(context, key)
                : context[key];
            return (keyValue &&
                utils_1.CommonUtil.type(keyValue) === "string" &&
                utils_1.CommonUtil.matchesAnyElement(args[key], function (elm) {
                    return keyValue.startsWith(util_1.ConditionUtil.getValueByPath(context, elm));
                }));
        });
    };
    return StartsWithCondition;
}());
exports.StartsWithCondition = StartsWithCondition;
