import { useEffect, useState } from 'react';
import { Typography, Button, TextField, Box } from '@mui/material';
import { FormDataType } from '../types/regist.type';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

export default function BasicTable() {
  const [rows, setRows] = useState<FormDataType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const boardList = localStorage.getItem('formData');
    if (boardList) {
      setRows(JSON.parse(boardList));
    }
  }, []);

  const onClickRow = (row: FormDataType) => {
    navigate(`/detail/${row.number}`);
  };

  const onClickDeleteButton = (
    event: React.FormEvent<HTMLButtonElement>,
    rowNumber: number
  ) => {
    event.stopPropagation();

    const updatedRows = rows.filter((row) => row.number !== rowNumber);
    alert('삭제되었습니다');
    setRows(updatedRows);
    localStorage.setItem('formData', JSON.stringify(updatedRows));
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        게시판 목록
        <Button
          sx={{ ml: 2 }}
          style={{ width: '10px' }}
          variant="contained"
          color="primary"
          onClick={(event) => onClickDeleteButton(event, row.number as number)}
        >
          등록
        </Button>
      </Typography>
      <Box display="flex" alignItems="center">
        <TextField
          label="제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ mr: 2 }} // 오른쪽에 여백 추가
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick} // 버튼 클릭 핸들러
          sx={{ height: '100%' }} // 버튼 높이를 텍스트 필드에 맞춤
        >
          클릭
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50px' }}>번호</TableCell>
              <TableCell align="right">제목</TableCell>
              <TableCell align="right">내용</TableCell>
              <TableCell align="center">삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => onClickRow(row)}
              >
                <TableCell component="th" scope="row">
                  {row.number}
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell align="center">
                  <Button
                    style={{ width: '10px' }}
                    variant="contained"
                    color="primary"
                    onClick={(event) =>
                      onClickDeleteButton(event, row.number as number)
                    }
                  >
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
