import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from "axios";

const Navbar = () => {
  const {navigate,isEducator,backendUrl,setIsEducator,getToken}=useContext(AppContext)

  const location = useLocation(); 
  const isCourseListPage=location.pathname.includes('/course-list');
  
  const { openSignIn } = useClerk();
  const {  user } = useUser(); 

  const becomeEducator= async () => {
    try {
        if(isEducator) {
            navigate('/educator')
            return
            }
        const token = await getToken();
        const {data} = await axios.get(backendUrl +'/api/educator/update-role',
            {headers: { Authorization: `Bearer ${token}` } })
            if(data.success) {
                setIsEducator(true)
                toast.success(data.message)
            } else{
                toast.error(data.message)
            
            }
    } catch (error) {
        toast.error(error.message)
    }
  }
        
   
  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 
    md:px-14 lg:px-40 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
        <img onClick={()=>navigate('/')} src={ assets.logo_correct1 } alt="Logo" className='w-28 lg:w-40  cursor-pointer'/>
        {/* navbar for desktop view */}
        <div className='hidden md:flex items-center
         gap-5 text-gray-500 '>
            <div className='flex items-center gap-5'>
               { user && 
                <>
                    <button onClick={becomeEducator} >{isEducator? 'Educator Dashboard' : 'Become Educator'}</button>
                    | <Link to='/my-enrollments'>My Enrollments</Link>
                </>
               
                }
            </div>
           { user ? <UserButton /> : 
            <button onClick={()=> openSignIn()} className='bg-blue-600 text-white px-5 py-2 
            rounded-full'>Create Account</button>}
        </div>

        {/* navbar for mobile view */}
        
        <div className='md:hidden flex items-center gap-2 sm:gap-5 text-grey-500'>
            <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
                 { user && 
                    <>
                        <button onClick={becomeEducator} 
                    >{isEducator? 'Educator Dashboard' : 'Become Educator'}</button>
                        | <Link to='/my-enrollments'>My Enrollments</Link>
                    </>
               
                }
            </div>
            {
                user ? <UserButton /> : 
                 <button onClick={()=> openSignIn()} ><img src={assets.user_icon} alt='' /></button>
            }
           
        </div>
    </div>
  )
}

export default Navbar
