import { AxiosResponse } from 'axios';
import { CommonApiResponse } from './commonApi.res.type';

export type BoardListResDto = {
  number: number;
  title1: string;
  content1: string;
};

export type BoardListResAxiosApiResponse = AxiosResponse<
  CommonApiResponse<BoardListResDto[]>
>;
