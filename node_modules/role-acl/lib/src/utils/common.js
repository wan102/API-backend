"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var notation_1 = __importDefault(require("notation"));
var matcher_1 = __importDefault(require("matcher"));
var array_1 = require("./array");
var conditions_1 = require("../conditions");
var core_1 = require("../core");
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var CommonUtil = /** @class */ (function () {
    function CommonUtil() {
    }
    CommonUtil.isStringOrArray = function (value) {
        return typeof value === 'string' || array_1.ArrayUtil.isFilledStringArray(value);
    };
    CommonUtil.eachKey = function (obj, callback) {
        return Object.keys(obj).forEach(callback);
    };
    CommonUtil.someTrue = function (elements) {
        return elements.some(function (elm) { return elm; });
    };
    CommonUtil.allTrue = function (elements) {
        return elements.every(function (elm) { return elm; });
    };
    CommonUtil.allFalse = function (elements) {
        return elements.every(function (elm) { return !elm; });
    };
    CommonUtil.anyMatch = function (strings, patterns) {
        var stringArray = array_1.ArrayUtil.toStringArray(strings);
        var patternArray = array_1.ArrayUtil.toStringArray(patterns);
        return matcher_1.default(stringArray, patternArray).length !== 0;
    };
    CommonUtil.toExtendedJSON = function (o) {
        return JSON.stringify(o, function (key, value) {
            if (typeof value === 'function') {
                return '/Function(' + value.toString() + ')/';
            }
            return value;
        });
    };
    CommonUtil.fromExtendedJSON = function (json) {
        return JSON.parse(json, function (key, value) {
            if (typeof value === 'string' &&
                value.startsWith('/Function(') &&
                value.endsWith(')/')) {
                value = value.substring(10, value.length - 2);
                return new Function('return ' + value)();
            }
            return value;
        });
    };
    CommonUtil.containsPromises = function (elements) {
        return elements.some(function (elm) {
            return elm && typeof (elm.then) === 'function' && Promise.resolve(elm) == elm;
        });
    };
    CommonUtil.clone = function (o) {
        return lodash_clonedeep_1.default(o);
    };
    CommonUtil.type = function (o) {
        return Object.prototype.toString.call(o).match(/\s(\w+)/i)[1].toLowerCase();
    };
    CommonUtil.hasDefined = function (o, propName) {
        return o.hasOwnProperty(propName) && o[propName] !== undefined;
    };
    /**
     *  Gets roles and extended roles in a flat array.
     */
    CommonUtil.getFlatRoles = function (grants, roles, context, skipConditions) {
        return __awaiter(this, void 0, void 0, function () {
            var arr, _i, roles_1, roleName, roleItem, rolesMetCondition, _a, _b, extendedRoleName, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        roles = array_1.ArrayUtil.toStringArray(roles);
                        if (!roles)
                            throw new core_1.AccessControlError("Invalid role(s): " + JSON.stringify(roles));
                        arr = roles.slice();
                        _i = 0, roles_1 = roles;
                        _f.label = 1;
                    case 1:
                        if (!(_i < roles_1.length)) return [3 /*break*/, 9];
                        roleName = roles_1[_i];
                        roleItem = grants[roleName];
                        if (!roleItem)
                            throw new core_1.AccessControlError("Role not found: \"" + roleName + "\"");
                        if (!roleItem.$extend) return [3 /*break*/, 8];
                        rolesMetCondition = [];
                        if (!skipConditions) return [3 /*break*/, 2];
                        rolesMetCondition = Object.keys(roleItem.$extend);
                        return [3 /*break*/, 6];
                    case 2:
                        _a = 0, _b = Object.keys(roleItem.$extend);
                        _f.label = 3;
                    case 3:
                        if (!(_a < _b.length)) return [3 /*break*/, 6];
                        extendedRoleName = _b[_a];
                        return [4 /*yield*/, conditions_1.ConditionUtil.evaluate(roleItem.$extend[extendedRoleName].condition, context)];
                    case 4:
                        if (_f.sent()) {
                            rolesMetCondition.push(extendedRoleName);
                        }
                        _f.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6:
                        _d = (_c = array_1.ArrayUtil).uniqConcat;
                        _e = [arr];
                        return [4 /*yield*/, this.getFlatRoles(grants, rolesMetCondition, context, skipConditions)];
                    case 7:
                        arr = _d.apply(_c, _e.concat([_f.sent()]));
                        _f.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/, arr];
                }
            });
        });
    };
    CommonUtil.getFlatRolesSync = function (grants, roles, context, skipConditions) {
        roles = array_1.ArrayUtil.toStringArray(roles);
        if (!roles)
            throw new core_1.AccessControlError("Invalid role(s): " + JSON.stringify(roles));
        var arr = roles.slice();
        for (var _i = 0, roles_2 = roles; _i < roles_2.length; _i++) {
            var roleName = roles_2[_i];
            var roleItem = grants[roleName];
            if (!roleItem)
                throw new core_1.AccessControlError("Role not found: \"" + roleName + "\"");
            if (roleItem.$extend) {
                var rolesMetCondition = [];
                if (skipConditions) {
                    rolesMetCondition = Object.keys(roleItem.$extend);
                }
                else {
                    for (var _a = 0, _b = Object.keys(roleItem.$extend); _a < _b.length; _a++) {
                        var extendedRoleName = _b[_a];
                        var conditionResult = conditions_1.ConditionUtil.evaluate(roleItem.$extend[extendedRoleName].condition, context);
                        if (typeof (conditionResult) !== 'boolean') {
                            throw new core_1.AccessControlError("Expected the condition function should return boolean, but returning " + conditionResult);
                        }
                        else if (conditionResult === true) {
                            rolesMetCondition.push(extendedRoleName);
                        }
                    }
                }
                arr = array_1.ArrayUtil.uniqConcat(arr, this.getFlatRolesSync(grants, rolesMetCondition, context, skipConditions));
            }
        }
        return arr;
    };
    CommonUtil.normalizeGrantsObject = function (grants) {
        var grantsCopy = this.clone(grants);
        for (var role in grantsCopy) {
            if (!grantsCopy[role].grants) {
                continue;
            }
            grantsCopy[role].grants.forEach(function (grant) {
                conditions_1.ConditionUtil.validateCondition(grant.condition);
                grant.attributes = grant.attributes || ['*'];
            });
            grantsCopy[role].score = grantsCopy[role].score || 1;
        }
        return grantsCopy;
    };
    CommonUtil.normalizeQueryInfo = function (query) {
        // clone the object
        var newQuery = this.clone(query);
        // validate and normalize role(s)
        newQuery.role = array_1.ArrayUtil.toStringArray(newQuery.role);
        if (!array_1.ArrayUtil.isFilledStringArray(newQuery.role)) {
            throw new core_1.AccessControlError("Invalid role(s): " + JSON.stringify(newQuery.role));
        }
        // validate resource
        if (newQuery.resource) {
            if (typeof newQuery.resource !== 'string' || newQuery.resource.trim() === '') {
                throw new core_1.AccessControlError("Invalid resource: \"" + newQuery.resource + "\"");
            }
            newQuery.resource = newQuery.resource.trim();
        }
        // validate action
        if (newQuery.action) {
            if (typeof newQuery.action !== 'string' || newQuery.action.trim() === '') {
                throw new core_1.AccessControlError("Invalid action: " + newQuery.action);
            }
        }
        return newQuery;
    };
    CommonUtil.normalizeAccessInfo = function (access) {
        // clone the object
        var newAccess = this.clone(access);
        // validate and normalize role(s)
        newAccess.role = array_1.ArrayUtil.toStringArray(newAccess.role);
        if (!array_1.ArrayUtil.isFilledStringArray(newAccess.role)) {
            throw new core_1.AccessControlError("Invalid role(s): " + JSON.stringify(newAccess.role));
        }
        // validate and normalize resource
        newAccess.resource = array_1.ArrayUtil.toStringArray(newAccess.resource);
        if (!array_1.ArrayUtil.isFilledStringArray(newAccess.resource)) {
            throw new core_1.AccessControlError("Invalid resource(s): " + JSON.stringify(newAccess.resource));
        }
        // validate and normalize resource
        newAccess.action = array_1.ArrayUtil.toStringArray(newAccess.action);
        if (!array_1.ArrayUtil.isFilledStringArray(newAccess.action)) {
            throw new core_1.AccessControlError("Invalid resource(s): " + JSON.stringify(newAccess.action));
        }
        newAccess.attributes = !newAccess.attributes ? ['*'] : array_1.ArrayUtil.toStringArray(newAccess.attributes);
        return newAccess;
    };
    /**
     *  Used to re-set (prepare) the `attributes` of an `IAccessInfo` object
     *  when it's first initialized with e.g. `.grant()` or `.deny()` chain
     *  methods.
     *  @param {IAccessInfo} access
     *  @returns {IAccessInfo}
     */
    CommonUtil.resetAttributes = function (access) {
        if (!access.attributes || array_1.ArrayUtil.isEmptyArray(access.attributes)) {
            access.attributes = ['*'];
        }
        return access;
    };
    /**
     *  Checks whether the given access info can be committed to grants model.
     *  @param {IAccessInfo|IQueryInfo} info
     *  @returns {Boolean}
     */
    CommonUtil.isInfoFulfilled = function (info) {
        return this.hasDefined(info, 'role')
            && this.hasDefined(info, 'action')
            && this.hasDefined(info, 'resource');
    };
    /**
     *  Commits the given `IAccessInfo` object to the grants model.
     *  CAUTION: if attributes is omitted, it will default to `['*']` which
     *  means "all attributes allowed".
     *  @param {Any} grants
     *  @param {IAccessInfo} access
     *  @throws {Error} If `IAccessInfo` object fails validation.
     */
    CommonUtil.commitToGrants = function (grants, access) {
        access = this.normalizeAccessInfo(access);
        access.role.forEach(function (role) {
            grants[role] = grants[role] || { score: 1 };
            grants[role].grants = grants[role].grants || [];
            conditions_1.ConditionUtil.validateCondition(access.condition);
            grants[role].grants.push({
                resource: access.resource,
                action: access.action,
                attributes: access.attributes,
                condition: access.condition
            });
        });
    };
    CommonUtil.getUnionGrantsOfRoles = function (grants, query) {
        return __awaiter(this, void 0, void 0, function () {
            var roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!grants) {
                            throw new core_1.AccessControlError('Grants are not set.');
                        }
                        // throws if has any invalid property value
                        query = this.normalizeQueryInfo(query);
                        return [4 /*yield*/, this.getFlatRoles(grants, query.role, query.context, query.skipConditions)];
                    case 1:
                        roles = _a.sent();
                        // iterate through roles and add permission attributes (array) of
                        // each role to attrsList (array).
                        return [2 /*return*/, roles.filter(function (role) {
                                return grants[role] && grants[role].grants;
                            }).map(function (role) {
                                return grants[role].grants;
                            }).reduce(function (allGrants, roleGrants) {
                                return allGrants.concat(roleGrants);
                            }, [])];
                }
            });
        });
    };
    CommonUtil.getUnionGrantsOfRolesSync = function (grants, query) {
        if (!grants) {
            throw new core_1.AccessControlError('Grants are not set.');
        }
        // throws if has any invalid property value
        query = this.normalizeQueryInfo(query);
        // get roles and extended roles in a flat array
        var roles = this.getFlatRolesSync(grants, query.role, query.context, query.skipConditions);
        // iterate through roles and add permission attributes (array) of
        // each role to attrsList (array).
        return roles.filter(function (role) {
            return grants[role] && grants[role].grants;
        }).map(function (role) {
            return grants[role].grants;
        }).reduce(function (allGrants, roleGrants) {
            return allGrants.concat(roleGrants);
        }, []);
    };
    CommonUtil.getUnionResourcesOfRoles = function (grants, query) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingGrants;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query.skipConditions = query.skipConditions || !query.context;
                        return [4 /*yield*/, this.getUnionGrantsOfRoles(grants, query)];
                    case 1:
                        matchingGrants = (_a.sent());
                        return [4 /*yield*/, this.filterGrantsAllowing(matchingGrants, query)];
                    case 2: return [2 /*return*/, (_a.sent())
                            .map(function (grant) {
                            return array_1.ArrayUtil.toStringArray(grant.resource);
                        }).reduce(notation_1.default.Glob.union, [])];
                }
            });
        });
    };
    CommonUtil.getUnionResourcesOfRolesSync = function (grants, query) {
        query.skipConditions = query.skipConditions || !query.context;
        var matchingGrants = (this.getUnionGrantsOfRolesSync(grants, query));
        return (this.filterGrantsAllowingSync(matchingGrants, query))
            .map(function (grant) {
            return array_1.ArrayUtil.toStringArray(grant.resource);
        }).reduce(notation_1.default.Glob.union, []);
    };
    CommonUtil.getUnionActionsOfRoles = function (grants, query) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingGrants;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query.skipConditions = query.skipConditions || !query.context;
                        return [4 /*yield*/, this.getUnionGrantsOfRoles(grants, query)];
                    case 1:
                        matchingGrants = (_a.sent())
                            .filter(function (grant) {
                            return _this.anyMatch(query.resource, grant.resource);
                        });
                        return [4 /*yield*/, this.filterGrantsAllowing(matchingGrants, query)];
                    case 2: return [2 /*return*/, (_a.sent())
                            .map(function (grant) {
                            return array_1.ArrayUtil.toStringArray(grant.action);
                        }).reduce(notation_1.default.Glob.union, [])];
                }
            });
        });
    };
    CommonUtil.getUnionActionsOfRolesSync = function (grants, query) {
        var _this = this;
        query.skipConditions = query.skipConditions || !query.context;
        var matchingGrants = (this.getUnionGrantsOfRolesSync(grants, query))
            .filter(function (grant) {
            return _this.anyMatch(query.resource, grant.resource);
        });
        return (this.filterGrantsAllowingSync(matchingGrants, query))
            .map(function (grant) {
            return array_1.ArrayUtil.toStringArray(grant.action);
        }).reduce(notation_1.default.Glob.union, []);
    };
    /**
     *  When more than one role is passed, we union the permitted attributes
     *  for all given roles; so we can check whether "at least one of these
     *  roles" have the permission to execute this action.
     *  e.g. `can(['admin', 'user']).createAny('video')`
     *
     *  @param {Any} grants
     *  @param {IQueryInfo} query
     *
     *  @returns {Array<String>} - Array of union'ed attributes.
     */
    CommonUtil.getUnionAttrsOfRoles = function (grants, query) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingGrants;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUnionGrantsOfRoles(grants, query)];
                    case 1:
                        matchingGrants = (_a.sent())
                            .filter(function (grant) {
                            return _this.anyMatch(query.resource, grant.resource)
                                && _this.anyMatch(query.action, grant.action);
                        });
                        return [4 /*yield*/, this.filterGrantsAllowing(matchingGrants, query)];
                    case 2: return [2 /*return*/, (_a.sent())
                            .map(function (grant) {
                            return array_1.ArrayUtil.toStringArray(grant.attributes);
                        }).reduce(notation_1.default.Glob.union, [])];
                }
            });
        });
    };
    CommonUtil.getUnionAttrsOfRolesSync = function (grants, query) {
        var _this = this;
        var matchingGrants = (this.getUnionGrantsOfRolesSync(grants, query))
            .filter(function (grant) {
            return _this.anyMatch(query.resource, grant.resource)
                && _this.anyMatch(query.action, grant.action);
        });
        return (this.filterGrantsAllowingSync(matchingGrants, query))
            .map(function (grant) {
            return array_1.ArrayUtil.toStringArray(grant.attributes);
        }).reduce(notation_1.default.Glob.union, []);
    };
    CommonUtil.filterGrantsAllowing = function (grants, query) {
        return __awaiter(this, void 0, void 0, function () {
            var matchingGrants, _i, grants_1, grant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!query.skipConditions) return [3 /*break*/, 1];
                        return [2 /*return*/, grants];
                    case 1:
                        matchingGrants = [];
                        _i = 0, grants_1 = grants;
                        _a.label = 2;
                    case 2:
                        if (!(_i < grants_1.length)) return [3 /*break*/, 5];
                        grant = grants_1[_i];
                        return [4 /*yield*/, conditions_1.ConditionUtil.evaluate(grant.condition, query.context)];
                    case 3:
                        if (_a.sent()) {
                            matchingGrants.push(grant);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, matchingGrants];
                }
            });
        });
    };
    CommonUtil.filterGrantsAllowingSync = function (grants, query) {
        if (query.skipConditions) {
            return grants;
        }
        else {
            var matchingGrants = [];
            for (var _i = 0, grants_2 = grants; _i < grants_2.length; _i++) {
                var grant = grants_2[_i];
                var conditionResult = query.skipConditions || conditions_1.ConditionUtil.evaluate(grant.condition, query.context);
                if (typeof (conditionResult) !== 'boolean') {
                    throw new core_1.AccessControlError("Expected the condition function should return boolean, but returning " + conditionResult);
                }
                if (conditionResult) {
                    matchingGrants.push(grant);
                }
            }
            return matchingGrants;
        }
    };
    CommonUtil.areGrantsAllowing = function (grants, query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _i, grants_3, grant, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!grants) {
                            return [2 /*return*/, false];
                        }
                        result = false;
                        _i = 0, grants_3 = grants;
                        _d.label = 1;
                    case 1:
                        if (!(_i < grants_3.length)) return [3 /*break*/, 7];
                        grant = grants_3[_i];
                        _a = result;
                        if (_a) return [3 /*break*/, 5];
                        _b = this.anyMatch(query.resource, grant.resource)
                            && this.anyMatch(query.action, grant.action);
                        if (!_b) return [3 /*break*/, 4];
                        _c = query.skipConditions;
                        if (_c) return [3 /*break*/, 3];
                        return [4 /*yield*/, conditions_1.ConditionUtil.evaluate(grant.condition, query.context)];
                    case 2:
                        _c = (_d.sent());
                        _d.label = 3;
                    case 3:
                        _b = (_c);
                        _d.label = 4;
                    case 4:
                        _a = (_b);
                        _d.label = 5;
                    case 5:
                        result = _a;
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    CommonUtil.areGrantsAllowingSync = function (grants, query) {
        if (!grants) {
            return false;
        }
        var result = false;
        for (var _i = 0, grants_4 = grants; _i < grants_4.length; _i++) {
            var grant = grants_4[_i];
            var conditionResult = query.skipConditions || conditions_1.ConditionUtil.evaluate(grant.condition, query.context);
            if (typeof (conditionResult) !== 'boolean') {
                throw new core_1.AccessControlError("Expected the condition function should return boolean, but returning " + conditionResult);
            }
            result = result || (this.anyMatch(query.resource, grant.resource)
                && this.anyMatch(query.action, grant.action)
                && (query.skipConditions || conditionResult));
        }
        return result;
    };
    CommonUtil.areExtendingRolesAllowing = function (roleExtensionObject, allowingRoles, query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, _i, roleName, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!roleExtensionObject) {
                            return [2 /*return*/, false];
                        }
                        result = false;
                        _a = [];
                        for (_b in roleExtensionObject)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        roleName = _a[_i];
                        _c = result;
                        if (_c) return [3 /*break*/, 5];
                        _d = allowingRoles[roleName];
                        if (!_d) return [3 /*break*/, 4];
                        _e = query.skipConditions;
                        if (_e) return [3 /*break*/, 3];
                        return [4 /*yield*/, conditions_1.ConditionUtil.evaluate(roleExtensionObject[roleName].condition, query.context)];
                    case 2:
                        _e = (_f.sent());
                        _f.label = 3;
                    case 3:
                        _d = (_e);
                        _f.label = 4;
                    case 4:
                        _c = (_d);
                        _f.label = 5;
                    case 5:
                        result = _c;
                        _f.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    CommonUtil.areExtendingRolesAllowingSync = function (roleExtensionObject, allowingRoles, query) {
        if (!roleExtensionObject) {
            return false;
        }
        var result = false;
        for (var roleName in roleExtensionObject) {
            var conditionResult = query.skipConditions || conditions_1.ConditionUtil.evaluate(roleExtensionObject[roleName].condition, query.context);
            if (typeof (conditionResult) !== 'boolean') {
                throw new core_1.AccessControlError("Expected the condition function should return boolean, but returning " + conditionResult);
            }
            result = result || (allowingRoles[roleName] && (query.skipConditions || conditionResult));
        }
        return result;
    };
    CommonUtil.getAllowingRoles = function (grants, query) {
        return __awaiter(this, void 0, void 0, function () {
            var allowingRoles, sortedRoles, _i, sortedRoles_1, role, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!grants) {
                            throw new core_1.AccessControlError('Grants are not set.');
                        }
                        allowingRoles = {};
                        sortedRoles = Object.keys(grants).sort(function (role1, role2) {
                            return grants[role1].score - grants[role2].score;
                        });
                        _i = 0, sortedRoles_1 = sortedRoles;
                        _d.label = 1;
                    case 1:
                        if (!(_i < sortedRoles_1.length)) return [3 /*break*/, 6];
                        role = sortedRoles_1[_i];
                        _a = allowingRoles;
                        _b = role;
                        return [4 /*yield*/, this.areGrantsAllowing(grants[role].grants, query)];
                    case 2:
                        _c = (_d.sent());
                        if (_c) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.areExtendingRolesAllowing(grants[role].$extend, allowingRoles, query)];
                    case 3:
                        _c = (_d.sent());
                        _d.label = 4;
                    case 4:
                        _a[_b] = _c;
                        _d.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, Object.keys(allowingRoles).filter(function (role) {
                            return allowingRoles[role];
                        })];
                }
            });
        });
    };
    CommonUtil.getAllowingRolesSync = function (grants, query) {
        if (!grants) {
            throw new core_1.AccessControlError('Grants are not set.');
        }
        var allowingRoles = {};
        var sortedRoles = Object.keys(grants).sort(function (role1, role2) {
            return grants[role1].score - grants[role2].score;
        });
        for (var _i = 0, sortedRoles_2 = sortedRoles; _i < sortedRoles_2.length; _i++) {
            var role = sortedRoles_2[_i];
            allowingRoles[role] = this.areGrantsAllowingSync(grants[role].grants, query) ||
                this.areExtendingRolesAllowingSync(grants[role].$extend, allowingRoles, query);
        }
        return Object.keys(allowingRoles).filter(function (role) {
            return allowingRoles[role];
        });
    };
    /**
     *  Checks the given grants model and gets an array of non-existent roles
     *  from the given roles.
     *  @param {Any} grants - Grants model to be checked.
     *  @param {Array<string>} roles - Roles to be checked.
     *  @returns {Array<String>} - Array of non-existent roles. Empty array if
     *  all exist.
     */
    CommonUtil.getNonExistentRoles = function (grants, roles) {
        var non = [];
        for (var _i = 0, roles_3 = roles; _i < roles_3.length; _i++) {
            var role = roles_3[_i];
            if (!grants.hasOwnProperty(role))
                non.push(role);
        }
        return non;
    };
    /**
     *  Extends the given role(s) with privileges of one or more other roles.
     *
     *  @param {Any} grants
     *  @param {String|Array<String>} roles
     *         Role(s) to be extended.
     *         Single role as a `String` or multiple roles as an `Array`.
     *         Note that if a role does not exist, it will be automatically
     *         created.
     *
     *  @param {String|Array<String>} extenderRoles
     *         Role(s) to inherit from.
     *         Single role as a `String` or multiple roles as an `Array`.
     *         Note that if a extender role does not exist, it will throw.
     *  @param {ICondition} [condition]
     *         Condition to be used for extension of roles. Only extends
     *         the roles when condition is met
     *
     *  @throws {Error}
     *          If a role is extended by itself or a non-existent role.
     */
    CommonUtil.extendRole = function (grants, roles, extenderRoles, condition) {
        conditions_1.ConditionUtil.validateCondition(condition);
        CommonUtil.extendRoleSync(grants, roles, extenderRoles, condition);
    };
    CommonUtil.extendRoleSync = function (grants, roles, extenderRoles, condition) {
        conditions_1.ConditionUtil.validateCondition(condition);
        var arrExtRoles = array_1.ArrayUtil.toStringArray(extenderRoles);
        if (!arrExtRoles)
            throw new core_1.AccessControlError("Invalid extender role(s): " + JSON.stringify(extenderRoles));
        var nonExistentExtRoles = this.getNonExistentRoles(grants, arrExtRoles);
        if (nonExistentExtRoles.length > 0) {
            throw new core_1.AccessControlError("Cannot extend with non-existent role(s): \"" + nonExistentExtRoles.join(', ') + "\"");
        }
        roles = array_1.ArrayUtil.toStringArray(roles);
        if (!roles)
            throw new core_1.AccessControlError("Invalid role(s): " + JSON.stringify(roles));
        var allExtendingRoles = this.getFlatRolesSync(grants, arrExtRoles, null, true);
        var extensionScore = allExtendingRoles.reduce(function (total, role) {
            return total + grants[role].score;
        }, 0);
        roles.forEach(function (role) {
            if (allExtendingRoles.indexOf(role) >= 0) {
                throw new core_1.AccessControlError("Attempted to extend role \"" + role + "\" by itself.");
            }
            grants[role] = grants[role] || { score: 1 };
            grants[role].score += extensionScore;
            grants[role].$extend = grants[role].$extend || {};
            arrExtRoles.forEach(function (extRole) {
                grants[role].$extend[extRole] = grants[role].$extend[extRole] || {};
                grants[role].$extend[extRole].condition = condition;
            });
        });
    };
    CommonUtil.matchesAllElement = function (values, predicateFn) {
        values = array_1.ArrayUtil.toArray(values);
        return values.every(predicateFn);
    };
    CommonUtil.matchesAnyElement = function (values, predicateFn) {
        values = array_1.ArrayUtil.toArray(values);
        return values.some(predicateFn);
    };
    CommonUtil.filter = function (object, attributes) {
        if (!Array.isArray(attributes) || attributes.length === 0) {
            return {};
        }
        var notation = new notation_1.default(object);
        return notation.filter(attributes).value;
    };
    CommonUtil.filterAll = function (arrOrObj, attributes) {
        var _this = this;
        if (!Array.isArray(arrOrObj)) {
            return this.filter(arrOrObj, attributes);
        }
        return arrOrObj.map(function (o) {
            return _this.filter(o, attributes);
        });
    };
    return CommonUtil;
}());
exports.CommonUtil = CommonUtil;
