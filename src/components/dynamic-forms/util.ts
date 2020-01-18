
export enum Field {
    TextField,
    TextArea,
    Select,
    Radio,
}

export type FieldType = {
    name: string;
    type: Field;
    options?: TextFieldOptions | SelectFieldOptions;
};

export type GeneralOptions = {
    validator?(value: any): any | Promise<any>;
    value?: string | string[] | number;
    required?: boolean;

}

export type TextFieldOptions = GeneralOptions & {
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    inputType: string;
    autoFocus?: boolean;
}

export type SelectFieldOptions = GeneralOptions & {
    options: string[] | number[];
};

export type GeneralProp = {
    onChange(field: string, value: string): any;
    control: any
};

export type DynamicUpdate = (key: string, value: any) => any;
export type FieldErrorHandler = (value: string) => any;

export function validatedUpdate<T>(update: DynamicUpdate, errorHandler: FieldErrorHandler) {
    return async (field: FieldType, value: T) => {
        try {
            if (field?.options?.validator) {
                await field?.options.validator(value)
            }
            update(field.name, value)
            errorHandler('');
        } catch (error) {
            errorHandler(error.message);
        }
    }
}