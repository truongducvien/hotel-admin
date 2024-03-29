import { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { Space, Spin } from 'antd' 

import { updateRoomTypeInfo, deleteRoomType } from "../../../store/slices/roomSlice";

import '../../../style/EditPage.scss';
import { API, API_URL } from "../../../api/constAPI";
import EditForm from "../../shared-components/EditForm";



export default function EditPage () {
   const navigate = useNavigate();
   const location = useLocation();
   const roomTypeId = location.state.id;
   const roomTypeName = location.state.typeRoom;
   const roomDataUrl = `${API_URL}/rooms`;
   
   const roomDispatch = useDispatch() 
   
   const roomTypes = useSelector( state => state.roomReducer.rooms)
   const isLoading = useSelector(state => state.roomReducer.isLoading)

   const [isSaved, setIsSaved] = useState(true);
   
   const [roomInfoChange, setRoomInfoChange] = useState({});
   const [newImageLink, setNewImageLink] = useState('');
   
   
   // If reload page, re-call API:
   useEffect(() => {
      API.get(`${roomDataUrl}/${roomTypeId}`).then(res => setRoomInfoChange(res.data))
   },[])

   const handleChange = (type, value) => {
      setIsSaved(false)
      switch (type){
         case 'typeRoom':
            setRoomInfoChange({...roomInfoChange, typeRoom: value });
            break;
         case 'price':
            setRoomInfoChange({...roomInfoChange, price: value });
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
            setRoomInfoChange({...roomInfoChange, imageUrl: [...roomInfoChange.imageUrl, value] });
            break;
         case 'newRoom':
            setRoomInfoChange({...roomInfoChange, roomsList: [...roomInfoChange.roomsList, value] });
            break;
      }
   }

   const handleAddImage = () => {
      handleChange('imageUrl', newImageLink);
      setNewImageLink('')
   }

   const handleDeleteImage = (index) => {
      const newImageList = [...roomInfoChange.imageUrl]
      newImageList.splice(index, 1)
      setRoomInfoChange(state=> (
         {...state, imageUrl: newImageList}
      ))
      setIsSaved(false)
   }

   const deleteRoom = (roomIdArray) => {
      const newRoomsList = roomInfoChange.roomsList.filter( item => !roomIdArray.includes(item.id))
      setRoomInfoChange(state=> (
         {...state, roomsList: newRoomsList}
      ))
      setIsSaved(false)
      console.log('call function');
   }

   const addNewRoom = (newRoom) => {
      handleChange('newRoom', newRoom);
   }

   // Update room quantity when roomsList changed:
   useEffect(()=> {
      if(roomInfoChange.roomsList){
         setRoomInfoChange({...roomInfoChange, quantity: roomInfoChange.roomsList.length })
      }
   }, [roomInfoChange.roomsList])

   const handleSaveChange = () => {
      roomDispatch(updateRoomTypeInfo(roomInfoChange));
      setIsSaved(true)
   }
   

   const handleReset = () => {
      if (roomTypes){
         //If reload page, rooms will be empty, re-call API to get the room data:
         if (roomTypes.length != 0){
            const roomInfo = roomTypes.filter( item => item.id === roomTypeId)
            setRoomInfoChange(...roomInfo)
         } else{
            API.get(`${roomDataUrl}/${roomTypeId}`).then(res => setRoomInfoChange(res.data))
         }
      }
      setIsSaved(true)
   }

   const handleDeleteRoomType = () => {
      if(window.confirm(`Are you sure to delete "${roomTypeName}"?`)){
         roomDispatch(deleteRoomType(roomTypeId))
         navigate(-1)
      }
   }

   window.onload = () => {setIsSaved(true)}

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

                     deleteRoom={deleteRoom}
                     addNewRoom={addNewRoom}
                  />

                  <button className="button" disabled={isSaved} onClick={handleSaveChange}>Save</button>
                  <button className="button" disabled={isSaved} onClick={handleReset}>Reset</button>
                  <button className="button" onClick={handleDeleteRoomType}>Delete</button>
               </div>
            )}
         </div>
      
      </>
   )
}
