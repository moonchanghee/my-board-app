import { useQuery, useMutation } from '@tanstack/react-query';
import { getBoardList, postBoard, updateBoard } from '../api/board';
import { useNavigate } from 'react-router-dom';

export const useGetBoardList = (params: string) => {
  return useQuery({
    queryKey: ['boardList', params],
    queryFn: () => getBoardList(params),
    // enabled: !!params,
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
