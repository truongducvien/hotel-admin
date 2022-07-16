import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid' 
import { NavLink } from "react-router-dom";
import '../../../style/AddRoomPage.scss'

import { useDispatch } from "react-redux";
import { addNewRoom } from "../../../store/slices/roomSlice";
import { API, API_URL } from "../../../api/constAPI";

import EditForm from "../../shared-components/EditForm";

const initialRoomState = {
   id: uuidv4(),
   key: uuidv4(),
   nameRoom: '',
   price: '',
   quantity: '',
   maxPerson: '',
   bed: '',
   bathrooms: '',
   convenient: '',
   introduction: '',
   imageUrl: []
}

export default function AddRoomPage (){
   const [roomInfoChange, setRoomInfoChange] = useState({...initialRoomState})
   const [newImageLink, setNewImageLink] = useState('')
   const [isSaved, setIsSaved] = useState(true)

   const roomsDispatch = useDispatch()
   const roomDataUrl = `${API_URL}/rooms`

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
      roomsDispatch(addNewRoom(roomInfoChange))
      API.post(roomDataUrl, roomInfoChange);
      setIsSaved(true);
      setRoomInfoChange({...initialRoomState});
   }

   const handleReset = () => {
      setRoomInfoChange({...initialRoomState});
      setIsSaved(true);
   }
   

   return (
      <>
         <div className='backButton-container'>
            <NavLink className='backButton' to='../room_management'>
               <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
         </div>

         <div className="addForm">
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
         </div>
      </>
   )
}