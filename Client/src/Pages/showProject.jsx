import React from 'react'
import { FiSend } from 'react-icons/fi';
import { useLocation } from 'react-router-dom'
import {TiGroup } from 'react-icons/ti'

function ShowProject() {

  const {state} = useLocation();

  return (
    <div className="flex h-screen w-screen">
    {/* left side of the project chat window */}
    <section className=" w-3/12 bg-gray-800 text-white pt-0 pb-1 flex flex-col">

    {/* header of the window */}

    <header className=" py-4 flex justify-end px-5 bg-slate-400 w-full">
   <TiGroup className=' rounded-full border-2 p-1 border-gray-800 text-4xl'/>
    </header>

    {/* messages list conversation area */}
      <div className="flex-1 overflow-y-auto">
    
      </div>

      {/* messages input */}
      <div className="mt-4 gap-2 mx-2 flex">
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white"
          placeholder="Type a message..."
        />
        <button className=" p-4 border-2 rounded border-white">
            <FiSend className=" text-md"/>
        </button>
      </div>
    </section>

    {/* Right Content Window */}
    <section className=" w-9/12 bg-gray-100 p-4">
      <h2 className="text-lg font-bold">Right-side Content</h2>
      <p>This section is for other content.</p>
    </section>
  </div>
  )
}

export default ShowProject