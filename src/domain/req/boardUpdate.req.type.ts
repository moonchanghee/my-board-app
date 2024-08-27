import { BoardDataType } from '../board.type';

export type BoardUpdateType = Omit<BoardDataType, 'number'>;
