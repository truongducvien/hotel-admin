import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Table } from 'antd';

import '../style/RoomManagement.scss'
import { columns } from '../store/tableData';



export default function RoomManagement ({roomList}) {
   return(
      <div className='roomManagement'>
         <NavLink className='backHomeButton' to='/'>Back Home</NavLink>
         <Table columns={columns} dataSource={roomList} />
      </div>
   )
}