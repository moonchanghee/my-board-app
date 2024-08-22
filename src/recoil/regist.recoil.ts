import { atom } from 'recoil';
import { FormDataType } from '../types/regist.type';
const initialFormData: FormDataType = {
  number: null,
  title: '',
  content: '',
};

export const formState = atom<FormDataType>({
  key: 'formDataAtom',
  default: initialFormData,
});
