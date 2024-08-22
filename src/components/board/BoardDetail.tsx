import { useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { formState } from '../../recoil/regist.recoil';
import { FormDataType } from '../../types/regist.type';

interface BoardRegistProps {
  id?: string;
}

export default function BoardDetail({ id }: BoardRegistProps) {
  const [formData, setFormData] = useRecoilState(formState);

  useEffect(() => {
    if (id) {
      const boardList = localStorage.getItem('formData');

      if (boardList) {
        const parsedData = JSON.parse(boardList);
        const foundItem = parsedData.find(
          (item: FormDataType) => item.number === Number(id)
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const onClickSubmitButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 로컬 스토리지에 저장된 데이터 가져오기
    const savedData = localStorage.getItem('formData');
    const dataList = savedData ? JSON.parse(savedData) : [];

    // 동일한 번호가 있는지 확인
    const isNumber = dataList.some(
      (data: FormDataType) => data.number === formData.number
    );

    if (!isNumber) {
      dataList.push(formData);
      localStorage.setItem('formData', JSON.stringify(dataList));
      alert('등록 성공했습니다');
      resetForm();
      return;
    }

    alert('번호중복 등록 실패했습니다');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {id ? '게시판 수정' : '게시판 등록'}
      </Typography>
      <form onSubmit={onClickSubmitButton}>
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
          >
            등록
          </Button>
        )}
      </form>
    </Container>
  );
}
