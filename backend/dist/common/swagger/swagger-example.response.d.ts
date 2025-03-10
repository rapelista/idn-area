interface Model {
    new (...args: any[]): object;
}
export declare function ListSwaggerExample(data: Model, message: string, meta?: boolean): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function DetailSwaggerExample(data: Model, message?: string): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function CreateSwaggerExample(data: Model, response: Model, isArray: boolean, message?: string): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function DeleteSwaggerExample(message?: string, description?: string): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
