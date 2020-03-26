/**
 * the types of field available and dynamicaly built
 */
export enum Field {
  TextField,
  TextArea,
  Select,
  Radio,
}

/**
 * Dynamic Field types configuration
 */
export type DynamicFieldType<T> = FieldType | ModelFieldType<T>;

/**
 * Field types configuration
 */
export type FieldType = {
  name: string;
  type: Field;
  label?: string;
  options?: TextFieldOptions | SelectFieldOptions;
};

/**
 * field types mapping to an existing data structure
 */
export interface ModelFieldType<T> {
  name: keyof T;
  type: Field;
  label?: string;
  options?: TextFieldOptions | SelectFieldOptions;
}

/**
 * general options available to all field types
 */
export type GeneralOptions = {
  validator?(value: any): any | Promise<any>;
  value?: string | string[] | number;
  required?: boolean;
};

/**
 * specific available options for text fields
 */
export type TextFieldOptions = GeneralOptions & {
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  inputType: string;
  autoFocus?: boolean;
};

/**
 * specific available options for select field
 */
export type SelectFieldOptions = GeneralOptions & {
  options: string[] | number[];
};

/**
 * Prop configuration available  for all fields
 */
export type GeneralProp = {
  onChange(field: string, value: string): any;
  control: any;
};

/**
 * function type to retrive value from any field
 */
export type DynamicUpdate = (key: string, value: any) => any;
/**
 * function to handle error during validation
 */
export type FieldErrorHandler = (value: string) => any;

/**
 * validation function for dynamic forms
 */
export function validatedUpdate<T>(
  update: DynamicUpdate,
  errorHandler: FieldErrorHandler,
) {
  return async (field: FieldType, value: T) => {
    try {
      if (field?.options?.validator) {
        await field?.options.validator(value);
      }
      update(field.name, value);
      errorHandler('');
    } catch (error) {
      errorHandler(error.message);
    }
  };
}

/**
 * preloades the form fields with default values 
 */
export function formValueLoader<T>(
  fields: DynamicFieldType<T>[],
  formValues?: any,
) {
  if (formValues) {
    return fields.map(f => {
      if (f.options) {
        f.options.value = formValues[f.name as string];
      }
      return f;
    });
  }
  return fields;
}
