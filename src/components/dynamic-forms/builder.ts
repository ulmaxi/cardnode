import { DynamicFieldType, Field, SelectFieldOptions, TextFieldOptions } from "./util";

export class FieldBuilder<T = any> {
    private config: DynamicFieldType<T> = {
        options: {}
    } as any;
    constructor(name: keyof T, field: Field, label?: string) {
        this.config.name = name;
        this.config.type = field;
        this.config.label = label;
        this.setField('text');
        return this;
    }

    private setField(fieldType: string) {
        if (this.config.type === Field.TextField) {
            this.config.options = {
                inputType: fieldType
            }
        }
        return this;
    }

    options(config: TextFieldOptions | SelectFieldOptions) {
        this.config.options = { ...this.config.options, ...config };
        return this;
    }

    compile() {
        return this.config;
    }

}
