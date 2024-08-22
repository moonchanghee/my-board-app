import BoardDetail from '../../../components/board/BoardDetail';
import { useParams } from 'react-router-dom';

export default function BoardDetailPage() {
  const { id } = useParams<{ id: string }>();

  return <BoardDetail id={id} />;
}
