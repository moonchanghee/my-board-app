export type CommonApiResponse<T> = {
  status: number;
  data: T;
  message: string;
};
