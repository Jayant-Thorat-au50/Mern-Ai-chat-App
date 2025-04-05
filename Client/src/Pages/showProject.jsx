import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";

function ShowProject() {
  const [existsingUsersOpen, setExistsingUsersOpen] = useState(true);

  const { state } = useLocation();

  console.log(state);
  

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
                <FaUser className=" text-black"/>
                </span>
                <p className=" text-xl text-black">Username</p>
            </div>
          </div>
        </div>

        {/* header of the window */}

        <header className=" py-2 flex justify-end px-5 bg-slate-400 w-full">
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
            <p className=" font-semibold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis, adipisci.</p>
          </div>
          {/* outgoing message */}

          <div className="chat w-9/12 mb-0.5 ml-auto bg-gray-100 p-1 mr-0.5 rounded-md text-black">
            <p className=" text-xs">example@gmail.com</p>
            <p className=" font-semibold">Lorem ipsum dolor sit amet consectetur, .</p>
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
    </div>
  );
}

export default ShowProject;
