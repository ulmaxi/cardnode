import DynamicSelect from './select';
import DynamicTextArea from './text-area';
import DynamicTextInput from './text-input';
import { Field, FieldType } from './util';

const Selector = (field: FieldType) => {
  switch (field.type) {
    case Field.TextField:
      return DynamicTextInput(field);
    case Field.TextArea:
      return DynamicTextArea(field);
    case Field.Select:
      return DynamicSelect(field);
    // case Field.Radio:
    //   return;
    default:
      throw 'not implemented';
  }
};

export default Selector;
