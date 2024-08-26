import { get, post } from '../index';

export const getBoardList = async (search?: string) => {
  const url = '/boardList';
  const params = search ? { search } : undefined;
  const response = await get({ url, params });

  return response.data;
};

export const postBoard = async (data = {}) => {
  const url = '/createBoard';
  const response = await post({ url, data });

  return response.data;
};
