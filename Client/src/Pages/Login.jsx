import { useState } from 'react';
import React from 'react'
import {FaEye} from 'react-icons/fa'
import {FaEyeSlash} from 'react-icons/fa'

 function Login() {
  return(
    <div className=' w-full flex justify-center items-center h-[100vh]'>

  
       <div className=' bg-blue-200 w-full h-full flex justify-center items-center  border'>
       <form action=""   noValidate className='shadow-[0_0_10px_black] w-[25rem] bg-white  h-fit flex  flex-col gap-3 items-center'>
            <h1 className=' text-center capitalize font-semibold text-2xl my-2 text-blue-600'>Registration page</h1>

            <div className=' flex flex-col items-start w-full px-10 space-y-1'>
                <label htmlFor="email" className=' font-semibold text-black text-xl'>Email</label>
                <input type="email" id='email' placeholder="Enter your email...." className='px-5 rounded text-black border-black py-2  border bg-[#F3F4F6] w-full' required name='email' />
            </div>
            <div className=' flex flex-col items-start w-full px-10 relative space-y-1'>
                <label htmlFor="password" className=' font-semibold  text-black text-xl' >Password</label>
                <input  placeholder="Enter your password...."  id='password' className='border  px-5 py-2 text-black w-full border-black rounded bg-[#F3F4F6] borderbg-transparent' required name='password' />
               
            </div>

            <div className=' px-10  w-full flex justify-center items-center my-1'>
                <button type='submit' className=' bg-blue-400 w-full font-bold text-2xl py-1 rounded text-black hover:bg-blue-300'>login</button>
            </div>

            <div>
                <p className='text-lg text-blue-600 font-semibold'>forget your password?  <span  className=' text-black' ><u>reset now</u></span></p>
            </div>
            <div className='my-2'>
                <p className='text-lg text-black bg-transparent'>Do not have an acc? <span  className=' text-blue-600 font-semibold' >register</span></p>
            </div>


        </form>

       </div>
      
    </div>
  )
 }



export default Login;