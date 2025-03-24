import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteAllusers } from '../Redux/Slices/AuthSlice'

function Home() {

    const dispacth = useDispatch()

    const deleteAllusersfromCo = async () => {
       const res =  await dispacth(deleteAllusers())
       console.log(res);
       
    }
    return (
        <>
        Home
        <button 
        onClick={deleteAllusersfromCo}
        >
            delete
        </button>
        </>
    )
}

export default Home
