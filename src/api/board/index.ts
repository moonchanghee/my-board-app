import { get, post, update, del } from '../index';
import { BoardUpdateType } from '../../types/board.type';

export const getBoardList = async (search?: string) => {
  const url = '/board';
  const params = search ? { search } : undefined;
  const response = await get({ url, params });

  return response.data.data;
};

export const postBoard = async (data: BoardUpdateType) => {
  const url = '/createBoard';
  const response = await post({ url, data });

  return response.data;
};

export const updateBoard = async ({
  id,
  data,
}: {
  id: string;
  data: BoardUpdateType;
}) => {
  const url = `/updateBoard/${id}`;
  const response = await update({ url, data });

  return response.data;
};

export const deleteBoard = async ({ id }: { id: number }) => {
  const url = `/deleteBoard/${id}`;
  const response = await del({ url });

  return response.data;
};
