export interface BoardDataType {
  number: number;
  title: string;
  content: string;
}

export type BoardUpdateType = Omit<BoardDataType, 'number'>;
