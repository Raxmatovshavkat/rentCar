import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from "class-validator";

@ValidatorConstraint({ async: false })
export class IsEmailOrUsernameConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const object = args.object as any;
        return (object.email && !object.username) || (!object.email && object.username);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Either email or username must be provided, but not both.';
    }
}

export function IsEmailOrUsername(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailOrUsernameConstraint,
        });
    };
}
