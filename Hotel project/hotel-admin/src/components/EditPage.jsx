import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom"

import '../style/EditPage.scss';

export default function EditPage () {
   const location = useLocation();
   const roomInfo = location.state;

   const [roomInfoChange, setRoomInfoChange] = useState(roomInfo)
   const [newRoomInfoChange, setNewRoomInfoChange] = useState({...roomInfoChange})
   const [newImageLink, setNewImageLink] = useState('')

   const handleChange = (type, value) => {
      switch (type){
         case 'id':
            setNewRoomInfoChange({...newRoomInfoChange, id: value });
            break;
         case 'nameRoom':
            setNewRoomInfoChange({...newRoomInfoChange, nameRoom: value });
            break;
         case 'price':
            setNewRoomInfoChange({...newRoomInfoChange, price: value });
            break;
         case 'quantity':
            setNewRoomInfoChange({...newRoomInfoChange, quantity: value });
            break;
         case 'maxPerson':
            setNewRoomInfoChange({...newRoomInfoChange, maxPerson: value });
            break;
         case 'bed':
            setNewRoomInfoChange({...newRoomInfoChange, bed: value });
            break;
         case 'bathrooms':
            setNewRoomInfoChange({...newRoomInfoChange, bathrooms: value });
            break;
         case 'convenient':
            setNewRoomInfoChange({...newRoomInfoChange, convenient: value });
            break;
         case 'introduction':
            setNewRoomInfoChange({...newRoomInfoChange, introduction: value });
            break;
         case 'imageUrl':
            setNewRoomInfoChange({...newRoomInfoChange, imageUrl: [...newRoomInfoChange.imageUrl,value] });
            break;
      }
   }

   const handleAddImage = () => {
      handleChange('imageUrl', newImageLink);
      setNewImageLink('')
   }

   const handleRoomInfoChange = () => {

   }

   useEffect(() => {
      console.log(newRoomInfoChange);
   }, [newRoomInfoChange])


   return (
      <div className="editPage">
         <NavLink to='/room_management'>Back to Room list</NavLink>

         <div className="editForm">
            <form action=""> 
               
               <div className="form-group">
                  <span>Id: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.id}
                     onChange={(e) => handleChange('id', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Room name: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.nameRoom}
                     onChange={(e) => handleChange('nameRoom', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Price: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.price}
                     onChange={(e) => handleChange('price', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Room available: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.quantity}
                     onChange={(e) => handleChange('quantity', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Maximum guests: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.maxPerson}
                     onChange={(e) => handleChange('maxPerson', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Bed: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.bed}
                     onChange={(e) => handleChange('bed', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Bathrooms: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.bathrooms}
                     onChange={(e) => handleChange('bathrooms', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Convenient: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.convenient}
                     onChange={(e) => handleChange('convenient', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Introduction: </span>
                  <input 
                     type="text" 
                     value={newRoomInfoChange.introduction}
                     onChange={(e) => handleChange('introduction', e.target.value)}
                  />
               </div>
            </form>

            <div className="imageForm">
               <div className="image-group">
                  {newRoomInfoChange.imageUrl.map((link, index) => (
                     <div className="image" key={index}>
                        <img style={{height: '80px'}} src={link} alt=''/>
                     </div>
                  ))}
               </div>

               <div className='imageLinkInput'>
                  <input 
                     id='enterImageLinkInput'
                     type="text"
                     placeholder='Enter image URL here ...'
                     onChange={e => setNewImageLink(e.target.value)}
                     value={newImageLink}
                  />
                  <button onClick={handleAddImage}>Add</button>
               </div>

            </div>
         </div>
      </div>
   )
}
