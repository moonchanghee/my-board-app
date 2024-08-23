import { get } from '../index';

export const getBoardList = async () => {
  return await get({
    url: '/hellow',
  }).then((response) => {
    return console.log('response', response);
  });
};


