import './App.css';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'antd/dist/antd.css';

import HomePage from './components/main-layout/HomePage';
import RoomManagement from './components/main-layout/rooms/RoomManagement';
import EditPage from './components/main-layout/rooms/EditPage';
import AddRoomPage from './components/main-layout/rooms/AddRoomPage';
import BookingManagement from './components/main-layout/booking/BookingManagement';
import UsersManagement from './components/main-layout/users/UsersManagement';


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <header>
            <div>The Ocean Villas</div>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </header>

          <div className='backgroundImage'>
            <img src='https://dmaevvtdousx6.cloudfront.net/uploads/2022/03/Hero_1.jpg' alt=""/>
          </div>
          <h2 className='title'>Hotel admin management</h2>

          <Routes>
            <Route>
              <Route path='/' element={<HomePage />}/>
              <Route path='/room_management' element={<RoomManagement />} />
              <Route path="/room_management/edit" element={<EditPage />} />
              <Route path="/room_management/new" element={<AddRoomPage />} />

              <Route path="/users_management" element={<UsersManagement />} />
              <Route path="/booking_management" element={<BookingManagement />} />
              
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
  ); 
}

export default App;
