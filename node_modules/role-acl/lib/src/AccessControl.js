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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils/");
var core_1 = require("./core");
var conditions_1 = require("./conditions");
/**
 *  @classdesc
 *  AccessControl class that implements RBAC (Role-Based Access Control) basics
 *  and ABAC (Attribute-Based Access Control) <i>resource</i> and <i>action</i>
 *  attributes.
 *
 *  Construct an `AccessControl` instance by either passing a grants object (or
 *  array fetched from database) or simple omit `grants` parameter if you are
 *  willing to build it programmatically.
 *
 *  <p><pre><code> var grants = {
 *      role1: {
 *          grants: [
 *              {
 *                  resource: 'resource1',
 *                  action: 'create'
 *                  attributes: ['*']
 *              },
 *              {
 *                  resource: 'resource1',
 *                  action: 'read'
 *                  attributes: ['*']
 *              },
 *              {
 *                  resource: 'resource2',
 *                  action: 'create'
 *                  attributes: ['*']
 *              }
 *          ]
 *      },
 *      role2: { ... }
 *  };
 *  var ac = new AccessControl(grants);</code></pre></p>
 *
 *  The `grants` object can also be an array, such as a flat list
 *  fetched from a database.
 *
 *  <p><pre><code> var flatList = [
 *      { role: "role1", resource: "resource1", action: "create", attributes: [ attrs ] },
 *      { role: "role1", resource: "resource1", action: "read", attributes: [ attrs ] },
 *      { role: "role2", ... },
 *      ...
 *  ];</code></pre></p>
 *
 *  We turn this list into a hashtable for better performance. We aggregate
 *  the list by roles first, resources second.
 *
 *  Below are equivalent:
 *  <p><pre><code> var grants = { role: "role1", resource: "resource1", action: "create", attributes: [ attrs ] }
 *  var same = { role: "role1", resource: "resource1", action: "create", attributes: [ attrs ] }</code></pre></p>
 *
 *  So we can also initialize with this flat list of grants:
 *  <p><pre><code> var ac = new AccessControl(flatList);
 *  console.log(ac.getGrants());</code></pre></p>
 *
 *  @author   Onur Yıldırım <onur@cutepilot.com>
 *  @license  MIT
 *
 *  @class
 *  @global
 *
 */
var AccessControl = /** @class */ (function () {
    /**
     *  Initializes a new instance of `AccessControl` with the given grants.
     *
     *  @param {Object|Array} grants - A list containing the access grant
     *      definitions. See the structure of this object in the examples.
     *
     *  @param {Object} customConditionFns - custom condition functions
     */
    function AccessControl(grants, customConditionFns) {
        if (grants === void 0) { grants = {}; }
        if (customConditionFns === void 0) { customConditionFns = {}; }
        conditions_1.ConditionUtil.resetCustomConditionFunctions();
        conditions_1.ConditionUtil.setCustomConditionFunctions(customConditionFns);
        this.setGrants(grants);
    }
    // -------------------------------
    //  PUBLIC METHODS
    // -------------------------------
    /**
     *  Gets the internal grants object that stores all current grants.
     *
     *  @return {Object} - Hash-map of grants.
     */
    AccessControl.prototype.getGrants = function () {
        return this._grants;
    };
    /**
     *  Sets all access grants at once, from an object or array.
     *  Note that this will reset the object and remove all previous grants.
     *  @chainable
     *
     *  @param {Object|Array} grantsObject - A list containing the access grant
     *         definitions.
     *
     *  @returns {AccessControl} - `AccessControl` instance for chaining.
     */
    AccessControl.prototype.setGrants = function (grantsObject) {
        var _this = this;
        this._grants = {};
        var type = utils_1.CommonUtil.type(grantsObject);
        if (type === "object") {
            this._grants = utils_1.CommonUtil.normalizeGrantsObject(grantsObject);
        }
        else if (type === "array") {
            grantsObject.filter((function (grant) { return !grant.extend || !grant.extend.length; }))
                .forEach(function (item) {
                return utils_1.CommonUtil.commitToGrants(_this._grants, item);
            });
            grantsObject.filter((function (item) { return item.extend && item.extend.length; }))
                .forEach(function (item) {
                return utils_1.CommonUtil.extendRole(_this._grants, item.role, item.extend);
            });
        }
        return this;
    };
    /**
     *  Resets the internal grants object and removes all previous grants.
     *  @chainable
     *
     *  @returns {AccessControl} - `AccessControl` instance for chaining.
     */
    AccessControl.prototype.reset = function () {
        this._grants = {};
        conditions_1.ConditionUtil.resetCustomConditionFunctions();
        return this;
    };
    /**
     *  Extends the given role(s) with privileges of one or more other roles.
     *  @chainable
     *
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
     *
     *  @returns {AccessControl} - `AccessControl` instance for chaining.
     *
     *  @throws {Error}
     *          If a role is extended by itself or a non-existent role.
     */
    AccessControl.prototype.extendRole = function (roles, extenderRoles, condition) {
        // When extending role we are not checking for conditions so we can use sync method
        return this.extendRoleSync(roles, extenderRoles, condition);
    };
    AccessControl.prototype.extendRoleSync = function (roles, extenderRoles, condition) {
        utils_1.CommonUtil.extendRoleSync(this._grants, roles, extenderRoles, condition);
        return this;
    };
    /**
     *  Removes all the given role(s) and their granted permissions, at once.
     *  @chainable
     *
     *  @param {String|Array<String>} roles - An array of roles to be removed.
     *      Also accepts a string that can be used to remove a single role.
     *
     *  @returns {AccessControl} - `AccessControl` instance for chaining.
     */
    AccessControl.prototype.removeRoles = function (roles) {
        var _this = this;
        var rolesToRemove = utils_1.ArrayUtil.toStringArray(roles).sort();
        // Remove these roles from $extend list of each remaining role.
        this._each(function (role, roleItem) {
            if (roleItem.$extend) {
                // Adjust scores and remove
                rolesToRemove.forEach(function (role) {
                    if (roleItem.$extend[role]) {
                        roleItem.score -= _this._grants[role].score;
                        delete roleItem.$extend[role];
                    }
                });
            }
        });
        rolesToRemove.forEach(function (role) {
            delete _this._grants[role];
        });
        return this;
    };
    /**
     *  Gets all the unique roles that have at least one access information.
     *
     *  @returns {Array<String>}
     *
     *  @example
     *  ac.grant('admin, user').createAny('video').grant('user').readOwn('profile');
     *  console.log(ac.getRoles()); // ["admin", "user"]
     */
    AccessControl.prototype.getRoles = function () {
        return Object.keys(this._grants);
    };
    /**
     *  Checks whether any permissions are granted to the given role.
     *
     *  @param {String} role - Role to be checked.
     *
     *  @returns {Boolean}
     */
    AccessControl.prototype.hasRole = function (role) {
        return this._grants.hasOwnProperty(role);
    };
    /**
      *  Get allowed grants when conditions are skipped
       return CommonUtil.getUnionGrantsOfRoles(this._grants, query);
  
      *  @returns {IAccessInfo[]} - grants
      */
    AccessControl.prototype.allowedGrants = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.CommonUtil.getUnionGrantsOfRoles(this._grants, query)];
            });
        });
    };
    AccessControl.prototype.allowedGrantsSync = function (query) {
        return utils_1.CommonUtil.getUnionGrantsOfRolesSync(this._grants, query);
    };
    /**
     * Get roles which allow this permission
     * @param {IQueryInfo} query - permission query object we want to check
     *
     * @returns {String[]} - roles
     */
    AccessControl.prototype.allowingRoles = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.CommonUtil.getAllowingRoles(this._grants, query)];
            });
        });
    };
    AccessControl.prototype.allowingRolesSync = function (query) {
        return utils_1.CommonUtil.getAllowingRolesSync(this._grants, query);
    };
    /**
     * Get allowed actions of resource when conditions are skipped
     * @param {IQueryInfo} query - permission query object we want to check
     *
     *  @returns {String[]} - actions
     */
    AccessControl.prototype.allowedActions = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.CommonUtil.getUnionActionsOfRoles(this._grants, query)];
            });
        });
    };
    AccessControl.prototype.allowedActionsSync = function (query) {
        return utils_1.CommonUtil.getUnionActionsOfRolesSync(this._grants, query);
    };
    /**
     * Get allowed resources when conditions are skipped
     * @param {IQueryInfo} query - permission query object we want to check
     *
     *  @returns {String[]} - resources
     */
    AccessControl.prototype.allowedResources = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.CommonUtil.getUnionResourcesOfRoles(this._grants, query)];
            });
        });
    };
    AccessControl.prototype.allowedResourcesSync = function (query) {
        return utils_1.CommonUtil.getUnionResourcesOfRolesSync(this._grants, query);
    };
    /**
     *  Gets an instance of `Query` object. This is used to check whether
     *  the defined access is allowed for the given role(s) and resource.
     *  This object provides chainable methods to define and query the access
     *  permissions to be checked.
     *  @name AccessControl#can
     *  @alias AccessControl#access
     *  @function
     *  @chainable
     *
     *  @param {String|Array|IQueryInfo} role - A single role (as a string),
     *      a list of roles (as an array) or an {@link ?api=ac#AccessControl~IQueryInfo|`IQueryInfo` object}
     *      that fully or partially defines the access to be checked.
     *
     *  @returns {Query} - The returned object provides chainable
     *      methods to define and query the access permissions to be checked.
     *      See {@link ?api=ac#AccessControl~Query|`Query` inner class}.
     *
     *  @example
     *  var ac = new AccessControl(grants);
     *
     *  ac.can('admin').create('profile');
     *  // equivalent to:
     *  ac.can().role('admin').create('profile');
     *  // equivalent to:
     *  ac.can().role('admin').resource('profile').createA();
     *
     *  // To check for multiple roles:
     *  ac.can(['admin', 'user']).createOwn('profile');
     *  // Note: when multiple roles checked, acquired attributes are union (merged).
     */
    AccessControl.prototype.can = function (role) {
        return new core_1.Query(this._grants, role);
    };
    /**
     *  Alias of `can()`.
     *  @private
     */
    AccessControl.prototype.access = function (role) {
        return this.can(role);
    };
    /**
     *  Gets an instance of `Permission` object that checks and defines
     *  the granted access permissions for the target resource and role.
     *  Normally you would use `AccessControl#can()` method to check for
     *  permissions but this is useful if you need to check at once by passing
     *  a `IQueryInfo` object; instead of chaining methods
     *  (as in `.can(<role>).<action>(<resource>)`).
     *
     *  @param {IQueryInfo} queryInfo
     *         A fulfilled {@link ?api=ac#AccessControl~IQueryInfo|`IQueryInfo` object}.
     *
     *  @returns {Permission} - An object that provides properties
     *  and methods that defines the granted access permissions. See
     *  {@link ?api=ac#AccessControl~Permission|`Permission` inner class}.
     *
     *  @example
     *  var ac = new AccessControl(grants);
     *  var permission = ac.permission({
     *      role: "user",
     *      action: "update",
     *      resource: "profile"
     *  });
     *  permission.granted; // Boolean
     *  permission.attributes; // Array e.g. [ 'username', 'password', 'company.*']
     *  permission.filter(object); // { username, password, company: { name, address, ... } }
     */
    AccessControl.prototype.permission = function (queryInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = core_1.Permission.bind;
                        _b = [void 0, queryInfo];
                        return [4 /*yield*/, utils_1.CommonUtil.getUnionAttrsOfRoles(this._grants, queryInfo)];
                    case 1: return [2 /*return*/, new (_a.apply(core_1.Permission, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    AccessControl.prototype.permissionSync = function (queryInfo) {
        return new core_1.Permission(queryInfo, utils_1.CommonUtil.getUnionAttrsOfRolesSync(this._grants, queryInfo));
    };
    /**
     *  Gets an instance of `Grant` (inner) object. This is used to grant access
     *  to specified resource(s) for the given role(s).
     *  @name AccessControl#grant
     *  @alias AccessControl#allow
     *  @function
     *  @chainable
     *
     *  @param {String|Array<String>|IAccessInfo} role
     *         A single role (as a string), a list of roles (as an array) or an
     *         {@link ?api=ac#AccessControl~IAccessInfo|`IAccessInfo` object}
     *         that fully or partially defines the access to be granted.
     *
     *  @return {Access}
     *          The returned object provides chainable properties to build and
     *          define the access to be granted. See the examples for details.
     *          See {@link ?api=ac#AccessControl~Access|`Access` inner class}.
     *
     *  @example
     *  var ac = new AccessControl(),
     *      attributes = ['*'];
     *
     *  ac.grant('admin').createAny('profile', attributes);
     *  // equivalent to:
     *  ac.grant().role('admin').createAny('profile', attributes);
     *  // equivalent to:
     *  ac.grant().role('admin').resource('profile').createAny(null, attributes);
     *  // equivalent to:
     *  ac.grant({
     *      role: 'admin',
     *      resource: 'profile',
     *  }).createAny(null, attributes);
     *  // equivalent to:
     *  ac.grant({
     *      role: 'admin',
     *      resource: 'profile',
     *      action: 'create:any',
     *      attributes: attributes
     *  });
     *  // equivalent to:
     *  ac.grant({
     *      role: 'admin',
     *      resource: 'profile',
     *      action: 'create',
     *      attributes: attributes
     *  });
     *
     *  // To grant same resource and attributes for multiple roles:
     *  ac.grant(['admin', 'user']).createOwn('profile', attributes);
     *
     *  // Note: when attributes is omitted, it will default to `['*']`
     *  // which means all attributes (of the resource) are allowed.
     */
    AccessControl.prototype.grant = function (role) {
        return new core_1.Access(this._grants, role);
    };
    /**
     *  Alias of `grant()`.
     */
    AccessControl.prototype.allow = function (role) {
        return this.grant(role);
    };
    /**
     * Converts grants object to JSON format
     */
    AccessControl.prototype.toJSON = function () {
        return utils_1.CommonUtil.toExtendedJSON({
            grants: this._grants,
            customConditionFunctions: conditions_1.ConditionUtil.getCustomConditionFunctions()
        });
    };
    AccessControl.prototype.registerConditionFunction = function (funtionName, fn) {
        conditions_1.ConditionUtil.registerCustomConditionFunction(funtionName, fn);
        return this;
    };
    // -------------------------------
    //  PRIVATE METHODS
    // -------------------------------
    /**
     *  @private
     */
    AccessControl.prototype._each = function (callback) {
        var _this = this;
        utils_1.CommonUtil.eachKey(this._grants, function (role) {
            return callback(role, _this._grants[role]);
        });
    };
    Object.defineProperty(AccessControl, "Error", {
        /**
         *  Documented separately in AccessControlError
         *  @private
         */
        get: function () {
            return core_1.AccessControlError;
        },
        enumerable: true,
        configurable: true
    });
    // -------------------------------
    //  PUBLIC STATIC METHODS
    // -------------------------------
    /**
     *  A utility method for deep cloning the given data object(s) while
     *  filtering its properties by the given attribute (glob) notations.
     *  Includes all matched properties and removes the rest.
     *
     *  Note that this should be used to manipulate data / arbitrary objects
     *  with enumerable properties. It will not deal with preserving the
     *  prototype-chain of the given object.
     *
     *  @param {Object|Array} data - A single or array of data objects
     *      to be filtered.
     *  @param {Array|String} attributes - The attribute glob notation(s)
     *      to be processed. You can use wildcard stars (*) and negate
     *      the notation by prepending a bang (!). A negated notation
     *      will be excluded. Order of the globs do not matter, they will
     *      be logically sorted. Loose globs will be processed first and
     *      verbose globs or normal notations will be processed last.
     *      e.g. `[ "car.model", "*", "!car.*" ]`
     *      will be sorted as:
     *      `[ "*", "!car.*", "car.model" ]`.
     *      Passing no parameters or passing an empty string (`""` or `[""]`)
     *      will empty the source object.
     *
     *  @returns {Object|Array} - Returns the filtered data object or array
     *      of data objects.
     *
     *  @example
     *  var assets = { notebook: "Mac", car: { brand: "Ford", model: "Mustang", year: 1970, color: "red" } };
     *
     *  var filtered = AccessControl.filter(assets, [ "*", "!car.*", "car.model" ]);
     *  console.log(assets); // { notebook: "Mac", car: { model: "Mustang" } }
     *
     *  filtered = AccessControl.filter(assets, "*"); // or AccessControl.filter(assets, ["*"]);
     *  console.log(assets); // { notebook: "Mac", car: { model: "Mustang" } }
     *
     *  filtered = AccessControl.filter(assets); // or AccessControl.filter(assets, "");
     *  console.log(assets); // {}
     */
    AccessControl.filter = function (data, attributes) {
        return utils_1.CommonUtil.filterAll(data, attributes);
    };
    /**
     *  Checks whether the given object is an instance of `AccessControl.Error`.
     *  @name AccessControl.isACError
     *  @alias AccessControl.isAccessControlError
     *  @function
     *
     *  @param {Any} object
     *         Object to be checked.
     *
     *  @returns {Boolean}
     */
    AccessControl.isACError = function (object) {
        return object instanceof core_1.AccessControlError;
    };
    /**
     *  Alias of `isACError`
     *  @private
     */
    AccessControl.isAccessControlError = function (object) {
        return AccessControl.isACError(object);
    };
    /**
     * Prepare AccessControl from JSON
     * @param aclJSON JSON generated from toJSON method.
     */
    AccessControl.fromJSON = function (aclJSON) {
        var aclObj = utils_1.CommonUtil.fromExtendedJSON(aclJSON);
        return new AccessControl(aclObj.grants, aclObj.customConditionFunctions);
    };
    return AccessControl;
}());
exports.AccessControl = AccessControl;
