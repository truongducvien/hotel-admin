import { useEffect } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Table } from 'antd';

import { useSelector, useDispatch } from 'react-redux'

import  EditPage  from '../main-layout/EditPage'
import '../../style/RoomManagement.scss'
import { columns } from './tableData';
import { fetchRoomDataAction } from '../../store/slices/roomSlice'


export default function RoomManagement () {

   const roomDispatch = useDispatch()
   const roomList = useSelector(state => state.roomReducer.roomList)
   const isLoading = useSelector(state => state.roomReducer.isLoading)


   useEffect(()=> {
      roomDispatch(fetchRoomDataAction())
   }, [])

   return(
      <div className='roomManagement'>
         {isLoading? (
            <span>Loading ...</span>
         ):(
            <>
               <NavLink className='backHomeButton' to='/'>Back to Home</NavLink>
               <Table columns={columns} dataSource={roomList} />

               {/* <Routes>
                  <Route>
                     <Route path="edit" element={<EditPage />} />

                  </Route>
               </Routes> */}
            </>
         )}
         
      </div>
   )
}