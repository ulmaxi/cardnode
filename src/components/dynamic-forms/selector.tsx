import DynamicSelect from './select';
import DynamicTextArea from './text-area';
import DynamicTextInput from './text-input';
import { Field, FieldType } from './util';

const Selector = (field: FieldType, disabled: boolean) => {
  switch (field.type) {
    case Field.TextField:
      return DynamicTextInput(field, disabled);
    case Field.TextArea:
      return DynamicTextArea(field, disabled);
    case Field.Select:
      return DynamicSelect(field, disabled);
    // case Field.Radio:
    //   return;
    default:
      throw 'not implemented';
  }
};

export default Selector;
