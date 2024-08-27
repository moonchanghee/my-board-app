import { useState } from 'react';
import { Typography, Button, Box, TextField } from '@mui/material';
import { BoardDataType } from '../domain/board.type';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { useGetBoardList, useDeleteBoard } from '../queries/board';

export default function BasicTable() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [searchParams, setSearchParams] = useState('');
  const { data: boardList = [] } = useGetBoardList(searchParams);
  const { mutate: deleteBoard } = useDeleteBoard();

  const onClickRow = (row: BoardDataType) => {
    navigate(`/detail/${row.number}`);
  };

  const onClickDeleteButton = (
    event: React.FormEvent<HTMLButtonElement>,
    rowNumber: number
  ) => {
    event.stopPropagation();
    deleteBoard({ id: rowNumber });
  };

  const onClickBoardRegistButton = () => {
    navigate('/regist');
  };

  const onClickSearchButton = () => {
    setSearchParams(title);
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
          onClick={onClickBoardRegistButton}
        >
          등록
        </Button>
      </Typography>
      <Box display="flex" alignItems="center">
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onClickSearchButton}
          sx={{ height: '100%' }}
        >
          검색
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
            {boardList.map((row, index: number) => (
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
