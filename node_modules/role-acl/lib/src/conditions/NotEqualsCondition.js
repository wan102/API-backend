"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./../utils/");
var core_1 = require("../core");
var util_1 = require("./util");
/**
 * Not equals condition
 *
 *  @author Dilip Kola <dilip@tensult.com>
 */
var NotEqualsCondition = /** @class */ (function () {
    function NotEqualsCondition() {
    }
    NotEqualsCondition.prototype.evaluate = function (args, context) {
        if (!args) {
            return true;
        }
        if (!context) {
            return false;
        }
        if (utils_1.CommonUtil.type(args) !== 'object') {
            throw new core_1.AccessControlError('NotEqualsCondition expects type of args to be object');
        }
        return !util_1.ConditionUtil.EQUALS.evaluate(args, context);
    };
    return NotEqualsCondition;
}());
exports.NotEqualsCondition = NotEqualsCondition;
