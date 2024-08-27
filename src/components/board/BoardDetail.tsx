import { useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { formState } from '../../recoil/regist.recoil';
import { BoradDataType } from '../../types/board.type';
import { usePostBoard, useUpdateBoard } from '../../queries/board';

interface BoardRegistProps {
  id?: string;
}

export default function BoardDetail({ id }: BoardRegistProps) {
  const [formData, setFormData] = useRecoilState(formState);
  const { mutate: postBoard } = usePostBoard();
  const { mutate: updateBoard } = useUpdateBoard();

  useEffect(() => {
    if (id) {
      setFormData({
        number: 1,
        title: 'title',
        content: 'content',
      });
    }
  }, [id]);

  const resetForm = useResetRecoilState(formState);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState: BoradDataType) => ({
      ...prevState,
      [name]: name === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const onClickSubmitButton = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    postBoard(formData);
    resetForm();

    return;
  };

  const onClickModifyButton = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (id) {
      updateBoard({ id, data: formData });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {id ? '게시판 수정' : '게시판 등록'}
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="number"
        type="number"
        label="번호"
        name="number"
        value={formData.number !== null ? formData.number.toString() : ''}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="제목"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="content"
        label="내용"
        id="content"
        multiline
        rows={4}
        value={formData.content}
        onChange={handleChange}
      />
      {id ? (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={onClickModifyButton}
        >
          수정
        </Button>
      ) : (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={onClickSubmitButton}
        >
          등록
        </Button>
      )}
    </Container>
  );
}
