import { IQueryInfo, IAccessInfo, ICondition } from '../core';
export declare class CommonUtil {
    static isStringOrArray(value: any): boolean;
    static eachKey(obj: any, callback: (key: string, index?: number) => void): void;
    static someTrue(elements: boolean[]): boolean;
    static allTrue(elements: boolean[]): boolean;
    static allFalse(elements: boolean[]): boolean;
    static anyMatch(strings: string | string[], patterns: string | string[]): boolean;
    static toExtendedJSON(o: any): string;
    static fromExtendedJSON(json: string): any;
    static containsPromises(elements: any[]): boolean;
    static clone(o: any): object;
    static type(o: any): string;
    static hasDefined(o: any, propName: string): boolean;
    /**
     *  Gets roles and extended roles in a flat array.
     */
    static getFlatRoles(grants: any, roles: string | string[], context?: any, skipConditions?: boolean): Promise<string[]>;
    static getFlatRolesSync(grants: any, roles: string | string[], context?: any, skipConditions?: boolean): string[];
    static normalizeGrantsObject(grants: any): any;
    static normalizeQueryInfo(query: IQueryInfo): IQueryInfo;
    static normalizeAccessInfo(access: IAccessInfo): IAccessInfo;
    /**
     *  Used to re-set (prepare) the `attributes` of an `IAccessInfo` object
     *  when it's first initialized with e.g. `.grant()` or `.deny()` chain
     *  methods.
     *  @param {IAccessInfo} access
     *  @returns {IAccessInfo}
     */
    static resetAttributes(access: IAccessInfo): IAccessInfo;
    /**
     *  Checks whether the given access info can be committed to grants model.
     *  @param {IAccessInfo|IQueryInfo} info
     *  @returns {Boolean}
     */
    static isInfoFulfilled(info: IAccessInfo | IQueryInfo): boolean;
    /**
     *  Commits the given `IAccessInfo` object to the grants model.
     *  CAUTION: if attributes is omitted, it will default to `['*']` which
     *  means "all attributes allowed".
     *  @param {Any} grants
     *  @param {IAccessInfo} access
     *  @throws {Error} If `IAccessInfo` object fails validation.
     */
    static commitToGrants(grants: any, access: IAccessInfo): void;
    static getUnionGrantsOfRoles(grants: any, query: IQueryInfo): Promise<IAccessInfo[]>;
    static getUnionGrantsOfRolesSync(grants: any, query: IQueryInfo): IAccessInfo[];
    static getUnionResourcesOfRoles(grants: any, query: IQueryInfo): Promise<string[]>;
    static getUnionResourcesOfRolesSync(grants: any, query: IQueryInfo): string[];
    static getUnionActionsOfRoles(grants: any, query: IQueryInfo): Promise<string[]>;
    static getUnionActionsOfRolesSync(grants: any, query: IQueryInfo): string[];
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
    static getUnionAttrsOfRoles(grants: any, query: IQueryInfo): Promise<string[]>;
    static getUnionAttrsOfRolesSync(grants: any, query: IQueryInfo): string[];
    static filterGrantsAllowing(grants: IAccessInfo[], query: IQueryInfo): Promise<IAccessInfo[]>;
    static filterGrantsAllowingSync(grants: IAccessInfo[], query: IQueryInfo): IAccessInfo[];
    static areGrantsAllowing(grants: IAccessInfo[], query: IQueryInfo): Promise<boolean>;
    static areGrantsAllowingSync(grants: IAccessInfo[], query: IQueryInfo): boolean;
    static areExtendingRolesAllowing(roleExtensionObject: any, allowingRoles: any, query: IQueryInfo): Promise<boolean>;
    static areExtendingRolesAllowingSync(roleExtensionObject: any, allowingRoles: any, query: IQueryInfo): boolean;
    static getAllowingRoles(grants: any, query: IQueryInfo): Promise<string[]>;
    static getAllowingRolesSync(grants: any, query: IQueryInfo): string[];
    /**
     *  Checks the given grants model and gets an array of non-existent roles
     *  from the given roles.
     *  @param {Any} grants - Grants model to be checked.
     *  @param {Array<string>} roles - Roles to be checked.
     *  @returns {Array<String>} - Array of non-existent roles. Empty array if
     *  all exist.
     */
    static getNonExistentRoles(grants: any, roles: string[]): string[];
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
    static extendRole(grants: any, roles: string | string[], extenderRoles: string | string[], condition?: ICondition): void;
    static extendRoleSync(grants: any, roles: string | string[], extenderRoles: string | string[], condition?: ICondition): void;
    static matchesAllElement(values: any, predicateFn: (elm: any) => boolean): boolean;
    static matchesAnyElement(values: any, predicateFn: (elm: any) => boolean): boolean;
    static filter(object: any, attributes: string[]): any;
    static filterAll(arrOrObj: any, attributes: string[]): any;
}
