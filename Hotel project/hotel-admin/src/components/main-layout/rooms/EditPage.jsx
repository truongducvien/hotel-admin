import { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { Space, Spin } from 'antd'

import { updateRoomInfo, deleteRoom } from "../../../store/slices/roomSlice";

import '../../../style/EditPage.scss';
import { API, API_URL } from "../../../api/constAPI";
import EditForm from "../../shared-components/EditForm";



export default function EditPage () {
   const navigate = useNavigate();
   const location = useLocation();
   const roomId = location.state.id;
   const roomName = location.state.nameRoom;
   const roomDataUrl = `${API_URL}/rooms`;
   
   const roomDispatch = useDispatch() 
   
   const rooms = useSelector( state => state.roomReducer.rooms)
   const isLoading = useSelector(state => state.roomReducer.isLoading)
   
   const [roomInfoChange, setRoomInfoChange] = useState({})
   const [newImageLink, setNewImageLink] = useState('')
   const [isSaved, setIsSaved] = useState(true)
   
   // useEffect(()=>{
   //    if(rooms){
   //       const roomInfo = rooms.filter( item => item.id === roomId)
   //       setRoomInfoChange(...roomInfo)
   //    }
   // },[rooms])

   // If reload page, re-call API:
   useEffect(() => {
      API.get(`${roomDataUrl}/${roomId}`).then(res => setRoomInfoChange(res.data))
   },[])

   const handleChange = (type, value) => {
      setIsSaved(false)
      switch (type){
         case 'nameRoom':
            setRoomInfoChange({...roomInfoChange, nameRoom: value });
            break;
         case 'price':
            setRoomInfoChange({...roomInfoChange, price: value });
            break;
         case 'quantity':
            setRoomInfoChange({...roomInfoChange, quantity: value });
            break;
         case 'maxPerson':
            setRoomInfoChange({...roomInfoChange, maxPerson: value });
            break;
         case 'bed':
            setRoomInfoChange({...roomInfoChange, bed: value });
            break;
         case 'bathrooms':
            setRoomInfoChange({...roomInfoChange, bathrooms: value });
            break;
         case 'convenient':
            setRoomInfoChange({...roomInfoChange, convenient: value });
            break;
         case 'introduction':
            setRoomInfoChange({...roomInfoChange, introduction: value });
            break;
         case 'imageUrl':
            setRoomInfoChange({...roomInfoChange, imageUrl: [...roomInfoChange.imageUrl,value] });
            break;
      }
   }

   const handleAddImage = () => {
      handleChange('imageUrl', newImageLink);
      setNewImageLink('')
   }

   const handleDeleteImage = (index) => {
      const imageList = [...roomInfoChange.imageUrl]
      imageList.splice(index, 1)
      setRoomInfoChange(state=> (
         {...state, imageUrl: imageList}
      ))
      setIsSaved(false)
   }

   const handleSaveChange = () => {
      roomDispatch(updateRoomInfo(roomInfoChange))
      setIsSaved(true)
   }

   const handleReset = () => {
      if (rooms){
         //If reload page, rooms will be empty, re-call API to get the room data:
         if (rooms.length != 0){
            const roomInfo = rooms.filter( item => item.id === roomId)
            setRoomInfoChange(...roomInfo)
         } else{
            API.get(`${roomDataUrl}/${roomId}`).then(res => setRoomInfoChange(res.data))
         }
      }
      setIsSaved(true)
   }

   const handleDeleteRoom = () => {
      if(window.confirm(`Are you sure to delete "${roomName}"?`)){
         roomDispatch(deleteRoom(roomId))
      }
      navigate(-1)
   }

   window.onload = () => {setIsSaved(false)}

   return (
      <>
         <div className='backButton-container'>
            <NavLink className='backButton' to='/room_management'>
               <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
         </div>
         <div className="editPage">

            {isLoading? (
               <>
                  <br /><br /> 
                  <Space>
                     <Spin size='large'/>
                  </Space>
               </>
            ):(
               roomInfoChange && roomInfoChange.id &&
               <div className="editForm">
                  <EditForm 
                     roomInfoChange={roomInfoChange} 
                     handleChange={handleChange} 
                     handleDeleteImage={handleDeleteImage}
                     setNewImageLink={setNewImageLink}
                     newImageLink={newImageLink}
                     handleAddImage={handleAddImage}
                  />

                  <button className="button" disabled={isSaved} onClick={handleSaveChange}>Save</button>
                  <button className="button" disabled={isSaved} onClick={handleReset}>Reset</button>
                  <button className="button" onClick={handleDeleteRoom}>Delete</button>
               </div>
            )}
         </div>
      
      </>
   )
}
