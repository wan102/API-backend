"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./../utils/common");
var core_1 = require("../core");
var util_1 = require("./util");
/**
 * Equals condition
 *
 *  @author Dilip Kola <dilip@tensult.com>
 */
var EqualsCondition = /** @class */ (function () {
    function EqualsCondition() {
    }
    EqualsCondition.prototype.evaluate = function (args, context) {
        if (!args) {
            return true;
        }
        if (!context) {
            return false;
        }
        if (common_1.CommonUtil.type(args) !== 'object') {
            throw new core_1.AccessControlError('EqualsCondition expects type of args to be object');
        }
        return Object.keys(args).every(function (key) {
            return common_1.CommonUtil.matchesAnyElement(args[key], function (elm) {
                var keyValue = key.startsWith('$.') ? util_1.ConditionUtil.getValueByPath(context, key) : context[key];
                return util_1.ConditionUtil.getValueByPath(context, elm) === keyValue;
            });
        });
    };
    return EqualsCondition;
}());
exports.EqualsCondition = EqualsCondition;
