import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
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

  return (
    <>
      <Typography component="h1" variant="h5">
        게시판 목록
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50px' }}>번호</TableCell>
              <TableCell align="right">제목</TableCell>
              <TableCell align="right">내용</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
