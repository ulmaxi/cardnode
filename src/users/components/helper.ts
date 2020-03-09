import { Field } from "src/components";
import { FieldBuilder } from "src/components/dynamic-forms/builder";

export function requiredTextField<T>(name: keyof T, value: any, label?: string | undefined) {
    return new FieldBuilder<T>(name, Field.TextField, label)
        .options({ inputType: 'text', required: true, value })
        .compile();
};

export function normalTextField<T>(name: keyof T, value: any, label?: string | undefined) {
    return new FieldBuilder<T>(name, Field.TextField, label)
        .options({ inputType: 'text', value })
        .compile();
};
