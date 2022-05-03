"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./../utils/common");
var index_1 = require("./index");
var core_1 = require("../core");
var utils_1 = require("../utils/");
/**
 * Not condition
 *
 *  @author Dilip Kola <dilip@tensult.com>
 */
var NotCondition = /** @class */ (function () {
    function NotCondition() {
    }
    NotCondition.prototype.evaluate = function (args, context) {
        if (!args) {
            return true;
        }
        if (!context) {
            return false;
        }
        if (common_1.CommonUtil.type(args) !== 'array' && common_1.CommonUtil.type(args) !== 'object') {
            throw new core_1.AccessControlError('NotCondition expects type of args to be array or object');
        }
        var conditions = utils_1.ArrayUtil.toArray(args);
        var conditionEvaluations = conditions.map(function (condition) {
            return index_1.ConditionUtil.evaluate(condition, context);
        });
        if (common_1.CommonUtil.containsPromises(conditionEvaluations)) {
            return Promise.all(conditionEvaluations).then(common_1.CommonUtil.allFalse);
        }
        else {
            return common_1.CommonUtil.allFalse(conditionEvaluations);
        }
    };
    return NotCondition;
}());
exports.NotCondition = NotCondition;
