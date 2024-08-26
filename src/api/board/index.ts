import { get, post, update } from '../index';
import { BoradDataType } from '../../types/board.type';

export const getBoardList = async (search?: string) => {
  const url = '/board';
  const params = search ? { search } : undefined;
  const response = await get({ url, params });

  return response.data;
};

export const postBoard = async (data: BoradDataType) => {
  const url = '/createBoard';
  const response = await post({ url, data });

  return response.data;
};

export const updateBoard = async ({
  id,
  data,
}: {
  id: string;
  data: BoradDataType;
}) => {
  const url = `/updateBoard/${id}`;
  const response = await update({ url, data });

  return response.data;
};
