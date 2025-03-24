import React from "react";
import { useDispatch } from "react-redux";
import { deleteAllusers, getProfile, logout } from "../Redux/Slices/AuthSlice";

function Home() {
  const dispacth = useDispatch();
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
  };

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
          <button>login</button>
        )}
      </div>

      <div>
        <button 
        onClick={handlegetProfile}
        >
            get user
        </button>
      </div>
    </>
  );
}

export default Home;
