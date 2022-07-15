import '../../style/EditForm.scss'

export default function EditForm ({
   roomInfoChange, 
   handleChange, 
   handleDeleteImage, 
   setNewImageLink,
   newImageLink,
   handleAddImage
}){
   return(
      <>
         <form action=""> 

               <div className="form-group roomName">
                  <span>Room name: </span>
                  <input 
                     type="text" 
                     value={roomInfoChange.nameRoom}
                     onChange={(e) => handleChange('nameRoom', e.target.value)}
                  />
                  <div className="animation"></div>
               </div>

               <div className="form-group">
                  <span>Price: </span>
                  <input 
                     type="text"
                     value={roomInfoChange.price}
                     onChange={(e) => handleChange('price', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Room available: </span>
                  <input 
                     type="number" 
                     value={roomInfoChange.quantity}
                     onChange={(e) => handleChange('quantity', e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <span>Maximum guests: </span>
                  <input 
                     type="number" 
                     value={roomInfoChange.maxPerson}
                     onChange={(e) => handleChange('maxPerson', e.target.value)}
                  />
               </div>

               <div className="form-group bed">
                  <span>Bed: </span>
                  <input 
                     type="text" 
                     value={roomInfoChange.bed}
                     onChange={(e) => handleChange('bed', e.target.value)}
                  />
               </div>

               <div className="form-group bathrooms">
                  <span>Bathrooms: </span>
                  <input 
                     type="text" 
                     value={roomInfoChange.bathrooms}
                     onChange={(e) => handleChange('bathrooms', e.target.value)}
                  />
               </div>

               <div className="form-group convenient">
                  <span>Convenient: </span>
                  <textarea
                     rows='4' 
                     cols='110'
                     value={roomInfoChange.convenient}
                     onChange={(e) => handleChange('convenient', e.target.value)}
                  />
               </div>

               <div className="form-group introduction">
                  <span>Introduction: </span>
                  <textarea
                     rows='7' 
                     cols='110'
                     value={roomInfoChange.introduction}
                     onChange={(e) => handleChange('introduction', e.target.value)}
                  />
               </div>
            </form>

            <div className="imageForm">
               <div className="image-group">
                  {roomInfoChange.imageUrl.map((link, index) => (
                     <div className="image" key={index}>
                        <img style={{height: '80px'}} src={link} alt=''/>
                        <div className="deleteButton">
                           <i onClick={()=>handleDeleteImage(index)} className="fa-solid fa-circle-xmark"></i>
                        </div>
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
                  <button
                     onClick={handleAddImage}
                     disabled={newImageLink===""? true: false}
                  >Add</button>
               </div>
            </div>
      </>
   )
}