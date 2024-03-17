import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ValidatorOptions, validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
          }
          const object = plainToInstance(metatype, value);
          const validatorOptions: ValidatorOptions = {
            validationError: {
              target: false,
              value: false,
            },
          };
          const errors = await validate(object, validatorOptions);
          if (errors.length > 0) {
            console.log(errors)
            const errorMessages = this.buildErrorMessages(errors);
            throw new BadRequestException({ mensaje: 'Validacion fallida', errores: errorMessages });
          }
          return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private buildErrorMessages(errors: any[]) {
      const errorMessages = [];
      for (const error of errors) {
        const constraints = error.constraints;
        if (constraints) {
          for (const key in constraints) {
            if (constraints.hasOwnProperty(key)) {
              errorMessages.push({ campo: error.property, mensaje: constraints[key] });
            }
          }
        }
      }
      return errorMessages;
    }
}
