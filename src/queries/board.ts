import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  getBoardList,
  postBoard,
  updateBoard,
  deleteBoard,
  getBoardDetail,
} from '../api/board';
import { useNavigate } from 'react-router-dom';

export const useGetBoardList = (params: string) => {
  return useQuery({
    queryKey: ['boardList', params],
    queryFn: () => getBoardList(params),
    // enabled: !!params,
  });
};

export const useGetBoardDetail = (id: string) => {
  return useQuery({
    queryKey: ['boardDetail', id],
    queryFn: () => getBoardDetail(id),
  });
};

export const usePostBoard = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postBoard,
    onSuccess: () => {
      alert('등록에 성공했습니다');
      navigate('/');
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};

export const useUpdateBoard = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: updateBoard,
    onSuccess: () => {
      alert('수정에 성공했습니다');
      navigate('/');
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      alert('삭제에 성공했습니다');
      queryClient.invalidateQueries({
        queryKey: ['boardList'],
      });
    },
    onError: (error) => {
      console.error('error', error);
    },
  });
};
