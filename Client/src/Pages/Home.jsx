import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAllusers, getProfile, logout } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  console.log(userData);
  console.log(isLoggedIn);

  const deleteAllusersfromCo = async () => {
    const res = await dispacth(deleteAllusers());
    console.log(res);
  };

  const handlelogout = async () => {
    const response = await dispacth(logout());
    console.log(response);
    if(response.payload.success){
      navigate('/')
    }
  };

  console.log(userData);
  
  const handlegetProfile = async () => {
    const response = await dispacth(getProfile());
    console.log(response);
  }
  return (
    <>
      <div className=" flex flex-col gap-5">
        <div>Home</div>
        <button onClick={deleteAllusersfromCo}>delete</button>
        {isLoggedIn ? (
          <button onClick={handlelogout}>logout</button>
        ) : (
          <button
          onClick={()=>{
            navigate('/loginModall')
          }

          }
          >login</button>
        )}
      </div>

      <div className="flex flex-col gap-5 w-1/2">
       {userData &&  <input type="text" className=" w-full" onChange={()=>{}} value={userData.email} />}
      </div>

      <div>
       {isLoggedIn &&  <button 
        onClick={handlegetProfile}
        >
            get user
        </button>}
      </div>
    </>
  );
}

export default Home;
