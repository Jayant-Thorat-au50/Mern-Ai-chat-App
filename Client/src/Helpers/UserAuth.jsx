import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserAuth({ children }) {
  const { user } = useSelector((state) => state.authState);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user && !token) {
      return navigate("/login");
    }
    if(user){
        return setLoading(false)
    }
  }, []);

  

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-2xl w-screen bg-gray-100 text-black">
          Loading...
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default UserAuth;
