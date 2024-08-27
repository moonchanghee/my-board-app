import BoardDetail from '../../../components/board/BoardDetail';
import { useParams } from 'react-router-dom';
import { useGetBoardDetail } from '../../../queries/board';
export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data:boardDetailData } = useGetBoardDetail(id as string);

  return <BoardDetail id={id} data={boardDetailData} />;
}
