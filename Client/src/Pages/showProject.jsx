import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/Slices/AuthSlice";

function ShowProject() {
  const [existsingUsersOpen, setExistsingUsersOpen] = useState(true);
  const [addCollabModalOpen, setAddCollabModalOpen] = useState(false);

  const { state } = useLocation();
  const dispacth = useDispatch();
  let {AllUsersList} = useSelector(state => state.authState);

    AllUsersList = [...AllUsersList , 

      {
        email:'example@gmail.com'
      },
      {
        email:'example@gmail.com'
      },
      {
        email:'example@gmail.com'
      },
      {
        email:'example@gmail.com'
      },
      {
        email:'example@gmail.com'
      },
      {
        email:'example@gmail.com'
      },
      {
        email:'example@gmail.com'
      },
    ]

  const getAllUsersList = async () => {
    const response = await dispacth(getAllUsers());
    console.log(response);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* left side of the project chat window */}
      <section className=" relative w-3/12 bg-gray-800 text-white pt-0 pb-1 flex flex-col">
        {/* users list in project */}

        <div
          className={
            !existsingUsersOpen
              ? "h-full w-full bg-gray-400 absolute top-0 transition-all ease-in-out duration-300 "
              : "h-full w-full bg-gray-400 absolute top-0 transition-all ease-linear -translate-x-96 "
          }
        >
          <header className=" flex bg-white justify-end w-full px-5 py-2">
            <IoMdClose
              onClick={() => setExistsingUsersOpen(!existsingUsersOpen)}
              className=" text-gray-500 hover:text-black transition-all ease-in-out duration-200 p-1 border-gray-800 text-4xl"
            />
          </header>

          <div className=" w-full">
            <div className=" w-full bg-slate-300 flex gap-2 justify-start items-center py-2 px-4">
              <span className=" p-2 aspect-square bg-white">
                <FaUser className=" text-black" />
              </span>
              <p className=" text-xl text-black">Username</p>
            </div>
          </div>
        </div>

        {/* header of the window */}

        <header className=" py-2 flex justify-between items-center px-5 bg-slate-400 w-full">
          <div className=" flex gap-2 items-center border-black px-2 border py-1 rounded-md ">
            <FaPlus />
            <button
              onClick={() => {
                getAllUsersList();
                setAddCollabModalOpen(true);
              }}
            >
              Add collaborators
            </button>
          </div>
          <TiGroup
            onClick={() => setExistsingUsersOpen(!existsingUsersOpen)}
            className=" rounded-full border-2 p-1 border-gray-800 text-4xl"
          />
        </header>

        {/* messages list conversation area */}
        <div className="flex-1 overflow-y-auto py-2 px-0">
          {/* incoming message */}
          <div className="chat w-9/12 bg-gray-100 mb-0.5 p-1  mr-0.5 rounded-md text-black">
            <p className=" text-xs">example@gmail.com</p>
            <p className=" font-semibold">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
              adipisci.
            </p>
          </div>
          {/* outgoing message */}

          <div className="chat w-9/12 mb-0.5 ml-auto bg-gray-100 p-1 mr-0.5 rounded-md text-black">
            <p className=" text-xs">example@gmail.com</p>
            <p className=" font-semibold">
              Lorem ipsum dolor sit amet consectetur, .
            </p>
          </div>
        </div>

        {/* messages input */}
        <div className="mt-4 gap-2 mx-2 flex">
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Type a message..."
          />
          <button className=" p-4 border-2 rounded border-white">
            <FiSend className=" text-md" />
          </button>
        </div>
      </section>

      {/* Right Content Window */}
      <section className=" w-9/12 bg-gray-200 p-4">
        <h2 className="text-lg font-bold">Right-side Content</h2>
        <p>This section is for other content.</p>
      </section>

      {/* add collaborators modal */}

      {addCollabModalOpen && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black/50 backdrop-blur-md p-4">
          <section className="  w-3/12 bg-white rounded-md">
            <header className=" p-2 text-center border-2  w-full rounded-md flex justify-between items-center">
              <h2 className=" font-semibold flex-grow text-xl ">
                Select users
              </h2>
              <p
                type="button"
                onClick={() => setAddCollabModalOpen(false)}
                className=" w-1/12 "
              >
                <IoMdClose className=" text-2xl text-gray-600 hover:text-black" />
              </p>
            </header>

            {/* userList */}

            <div className="usersList py-1">

            {AllUsersList.length > 0 && AllUsersList.map(user => 

              <div className=" border-2  px-2 py-1 border-t-0 flex justify-between items-center">
                <p>{user.email}</p>
                <input type="checkbox" className=" text-2xl scale-95" />
                </div>
            )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ShowProject;
