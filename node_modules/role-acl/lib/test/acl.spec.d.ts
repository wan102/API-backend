declare const AccessControl: any;
declare function type(o: any): any;
declare function throwsAccessControlError(fn: any, errMsg?: any): void;
declare function promiseThrowsError(promise: Promise<any>, errMsg?: any): Promise<void>;
declare function throwsError(fn: any, errMsg?: any, errName?: any): void;
