import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../Redux/Slices/Projectslices";



function Projects() {

    const dispatch = useDispatch()

    useEffect(() => { 

     (async getProjectList => {
        const response = await dispatch(getAllProjects())
        console.log(response);
        return response;
     })()

    }, [])
  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}

export default Projects;