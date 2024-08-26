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
      const boardList = localStorage.getItem('formData');

      if (boardList) {
        const parsedData = JSON.parse(boardList);
        const foundItem = parsedData.find(
          (item: BoradDataType) => item.number === Number(id)
        );

        if (foundItem) {
          setFormData({
            number: foundItem.number,
            title: foundItem.title,
            content: foundItem.content,
          });
        }
      }
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

    // 로컬 스토리지에 저장된 데이터 가져오기
    const dataList = getBoardList();

    // 동일한 번호가 있는지 확인
    const isNumber = dataList.some(
      (data: BoradDataType) => data.number === formData.number
    );

    if (!isNumber) {
      dataList.push(formData);
      postBoard(formData);
      localStorage.setItem('formData', JSON.stringify(dataList));
      resetForm();
      return;
    }

    alert('번호중복 등록 실패했습니다');
  };

  const onClickModifyButton = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const dataList = getBoardList();
    const updatedData = dataList.map((item: BoradDataType) =>
      item.number === formData.number ? formData : item
    );

    // 수정된 데이터를 로컬 스토리지에 다시 저장
    localStorage.setItem('formData', JSON.stringify(updatedData));

    if (id) {
      updateBoard({ id, data: formData });
    }
  };

  const getBoardList = () => {
    const savedData = localStorage.getItem('formData');

    return savedData ? JSON.parse(savedData) : [];
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
