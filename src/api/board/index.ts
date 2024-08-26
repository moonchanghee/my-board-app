import { get } from '../index';

export const getBoardList = async (search?: string) => {
  const url = '/boardList';

  const params = search ? { search } : undefined;

  return await get({
    url,
    params,
  }).then((response) => {
    return response.data;
  });
};


