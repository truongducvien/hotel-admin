import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import EditPage from './components/main-layout/EditPage';
import HomePage from './components/main-layout/HomePage';
import RoomManagement from './components/shared-components/RoomManagement';


function App() {

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
              <Route path='/room_management' element={<RoomManagement />} />
              <Route path="/room_management/edit" element={<EditPage />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  ); 
}

export default App;
