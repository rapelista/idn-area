import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class BaseValidationPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
    private formatErrors;
}
