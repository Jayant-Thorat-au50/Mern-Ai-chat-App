import React, { useEffect, useState } from 'react'
import axiosInstance from '../Helpers/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../Redux/Slices/Projectslices'

function Projects() {

  const dispatch = useDispatch()
  const projects = useSelector(state => state.projectstate.projectsList)

  useEffect(()=> {
    (async () => {
      await dispatch(getAllProjects())
    })()
  },[])

  console.log(projects);
  
  return (
    <div>
      {
         projects.map(ele => <h1 key={ele._id}>{ele.name}</h1>)
      }
    </div>
  )
}

export default Projects