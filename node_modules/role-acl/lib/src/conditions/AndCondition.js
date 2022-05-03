"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var core_1 = require("../core");
var utils_1 = require("../utils/");
/**
 * And condition
 *
 *  @author Dilip Kola <dilip@tensult.com>
 */
var AndCondition = /** @class */ (function () {
    function AndCondition() {
    }
    AndCondition.prototype.evaluate = function (args, context) {
        if (!args) {
            return true;
        }
        if (!context) {
            return false;
        }
        if (utils_1.CommonUtil.type(args) !== 'array' && utils_1.CommonUtil.type(args) !== 'object') {
            throw new core_1.AccessControlError('AndCondition expects type of args to be array or object');
        }
        var conditions = utils_1.ArrayUtil.toArray(args);
        var conditionEvaluations = conditions.map(function (condition) {
            return index_1.ConditionUtil.evaluate(condition, context);
        });
        if (utils_1.CommonUtil.containsPromises(conditionEvaluations)) {
            return Promise.all(conditionEvaluations).then(utils_1.CommonUtil.allTrue);
        }
        else {
            return utils_1.CommonUtil.allTrue(conditionEvaluations);
        }
    };
    return AndCondition;
}());
exports.AndCondition = AndCondition;
