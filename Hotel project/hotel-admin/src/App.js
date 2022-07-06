import './App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';

import EditPage from './components/EditPage';
import HomePage from './components/HomePage';
import RoomManagement from './components/RoomManagement';


function App() {
  const [roomList, setRoomList] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3050/roomList')
    .then(response => setRoomList(response.data))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <div className='backgroundImage'>
          <img src='https://dmaevvtdousx6.cloudfront.net/uploads/2022/03/Hero_1.jpg' alt=""/>
        </div>
        <h2 className='title'>Hotel admin management</h2>

        <Routes>
          <Route>
            <Route path='/' element={<HomePage />}/>
            <Route path='/room_management' element={<RoomManagement roomList={roomList} />} />
            <Route path="/room_management/edit" element={<EditPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  ); 
}

export default App;
