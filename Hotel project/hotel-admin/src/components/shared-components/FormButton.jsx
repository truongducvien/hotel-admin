import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import '../../style/FormButton.scss'

import { useDispatch, useSelector } from "react-redux/es/exports"
import { deleteRoom } from '../../store/slices/roomSlice'
import { API, API_URL } from "../../api/constAPI"

export default function FormButton ({ record }){
   const dispatch = useDispatch()
   const rooms = useSelector( state => state.roomReducer.rooms)
   
   const handleDelete = (record) => {
      if(window.confirm(`Are you sure to delete "${record.nameRoom}"?`)){
         dispatch(deleteRoom(record.id))
         API.delete(`${API_URL}/rooms/`, record.id)
      }
   }
   
   useEffect(() => {
      
   });

   return (
      <div className="formButton">
         <NavLink className='button' to='edit' state={record}>Edit</NavLink>
         <span className="button" onClick={() => handleDelete(record)}>Delete</span>
      </div>
   )
}