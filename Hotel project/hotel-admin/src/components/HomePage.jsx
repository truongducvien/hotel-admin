import { NavLink } from 'react-router-dom';
import '../style/HomePage.scss'

export default function HomePage (){
   return (
      <div className='homePage'>
         <NavLink className='button1' to='/room_management'>Room management</NavLink>
         <NavLink className='button2' to='/users_management'>Users management</NavLink>
      </div>
   )
}