import { atom } from 'recoil';
import { BoardUpdateType } from '../domain/board.type';
const initialFormData: BoardUpdateType = {
  title: '',
  content: '',
};

export const formState = atom<BoardUpdateType>({
  key: 'formDataAtom',
  default: initialFormData,
});
