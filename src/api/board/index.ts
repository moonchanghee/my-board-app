import { get, post, update, del } from '../index';

import { BoardUpdateType } from '../../domain/req/boardUpdate.req.type';
import { BoardListReqDto } from '../../domain/req/boardList.req.type';
import { BoardListResAxiosApiResponse } from '../../domain/res/boardList.res.type';

export const getBoardList = async (search?: string) => {
  const url = '/board';
  const params: BoardListReqDto | undefined = search ? { search } : undefined;

  const response = await get<BoardListReqDto, BoardListResAxiosApiResponse>({
    url,
    params,
  });

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

export const getBoardDetail = async (id: string) => {
  const url = `/searchBoardDetail/${id}`;
  const response = await get({ url });

  return response.data.data;
};
