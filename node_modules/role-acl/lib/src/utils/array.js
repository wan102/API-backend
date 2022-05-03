"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayUtil = /** @class */ (function () {
    function ArrayUtil() {
    }
    ArrayUtil.toStringArray = function (value) {
        if (Array.isArray(value)) {
            return value.slice();
        }
        if (typeof value === 'string') {
            return value.trim().split(/\s*[;,]\s*/);
        }
        return null;
    };
    ArrayUtil.toArray = function (value) {
        if (Array.isArray(value)) {
            return value.slice();
        }
        return [value];
    };
    ArrayUtil.isFilledStringArray = function (arr) {
        if (!arr || !Array.isArray(arr)) {
            return false;
        }
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var element = arr_1[_i];
            if (typeof element !== 'string' || element.trim() === '') {
                return false;
            }
        }
        return true;
    };
    ArrayUtil.isEmptyArray = function (value) {
        return Array.isArray(value) && value.length === 0;
    };
    ArrayUtil.uniqConcat = function (arrA, arrB) {
        var arr = arrA.slice();
        arrB.forEach(function (element) {
            if (arr.indexOf(element) < 0) {
                arr.push(element);
            }
        });
        return arr;
    };
    ArrayUtil.subtractArray = function (arrA, arrB) {
        return arrA.slice().filter(function (element) { return arrB.indexOf(element) === -1; });
    };
    return ArrayUtil;
}());
exports.ArrayUtil = ArrayUtil;
