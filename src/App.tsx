import './App.css';
import BoardRegist from '../src/pages/board/regist';
import BoardMain from '../src/pages';
import BoardDetail from '../src/pages/board/detail';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BoardMain />} />
        <Route path="/regist" element={<BoardRegist />} />
        <Route path="/detail/:id" element={<BoardDetail />} />
      </Routes>
    </>
  );
}

export default App;
