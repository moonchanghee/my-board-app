import { atom } from 'recoil';
import { BoradDataType } from '../types/board.type';
const initialFormData: BoradDataType = {
  title: '',
  content: '',
};

export const formState = atom<BoradDataType>({
  key: 'formDataAtom',
  default: initialFormData,
});
