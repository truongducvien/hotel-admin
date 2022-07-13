import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Table } from 'antd';

import { useSelector, useDispatch } from 'react-redux'

import '../../style/RoomManagement.scss'
import { columns } from './tableData';
import { fetchRoomDataAction } from '../../store/slices/roomSlice'


export default function RoomManagement () {

   const roomList = useSelector(state => state.roomReducer.roomList)
   const roomDispatch = useDispatch()
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
               <NavLink className='backHomeButton' to='/'>Back Home</NavLink>
               <Table columns={columns} dataSource={roomList} />
            </>
         )}
         
      </div>
   )
}