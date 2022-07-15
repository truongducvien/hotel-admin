import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { updateRoomInfo } from "../../store/slices/roomSlice";

import '../../style/EditPage.scss';
import { API, API_URL } from "../../api/constAPI";
import EditForm from "./EditForm";


export default function EditPage () {
   const location = useLocation();
   const roomId = location.state.id;
   const roomDataUrl = `${API_URL}/roomList`;
   
   const roomsDispatch = useDispatch() 
   
   const roomList = useSelector( state => state.roomReducer.roomList)
   const isLoading = useSelector(state => state.roomReducer.isLoading)
   
   const [roomInfoChange, setRoomInfoChange] = useState({})
   const [newImageLink, setNewImageLink] = useState('')
   const [isSaved, setIsSaved] = useState(true)
   
   // useEffect(()=>{
   //    if(roomList){
   //       const roomInfo = roomList.filter( item => item.id === roomId)
   //       setRoomInfoChange(...roomInfo)
   //    }
   // },[roomList])

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
      roomsDispatch(updateRoomInfo(roomInfoChange))
      API.patch(roomDataUrl, roomInfoChange.id, roomInfoChange)
      setIsSaved(true)
   }

   const handleReset = () => {
      if (roomList){
         //If reload page, roomList will be empty, re-call API to get the room data:
         if (roomList.length != 0){
            const roomInfo = roomList.filter( item => item.id === roomId)
            setRoomInfoChange(...roomInfo)
         } else{
            API.get(`${roomDataUrl}/${roomId}`).then(res => setRoomInfoChange(res.data))
         }
      }
      setIsSaved(true)
   }


   return (
      <div className="editPage">
         <NavLink className='backToRomListButton' to='/room_management'>Back to Room list</NavLink>

         {isLoading? (
            <span>Loading ...</span>
         ):(
            roomInfoChange && roomInfoChange.id &&
            <div className="editForm">
               <EditForm roomInfoChange={roomInfoChange} 
                  handleChange={handleChange} 
                  handleDeleteImage={handleDeleteImage}
                  setNewImageLink={setNewImageLink}
                  newImageLink={newImageLink}
                  handleAddImage={handleAddImage}
               />

               <button className="button" disabled={isSaved} onClick={handleSaveChange}>Save</button>
               <button className="button" disabled={isSaved} onClick={handleReset}>Reset</button>
            </div>
         )}
      </div>
   )
}
