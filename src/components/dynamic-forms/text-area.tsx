import TextArea from '@material-ui/core/TextareaAutosize';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FieldType, GeneralProp } from './util';

const DynamicTextArea = (field: FieldType) => {
  return ({ control, onChange }: GeneralProp) => {
    return (
      <>
        <Controller
          name={field.name}
          control={control}
          defaultValue={field?.options?.value}
          as={
            <TextArea
              required={field?.options?.required}
              onChange={(event: any) =>
                onChange(field.name, event.target.value)
              }
            />
          }
        />
      </>
    );
  };
};

export default DynamicTextArea;
