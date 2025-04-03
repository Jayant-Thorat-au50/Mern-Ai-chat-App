import React, { useEffect, useState } from "react";
import axiosInstance from "../Helpers/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../Redux/Slices/Projectslices";
import { useNavigate } from "react-router-dom";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projectstate.projectsList);

  useEffect(() => {
    (async () => {
      await dispatch(getAllProjects());
    })();
  }, []);

  console.log(projects);

  return (
    <div>
      {projects.map((project) => (
        <div
          key={project._id}
          typeof="button"
          onClick={() =>
            navigate("/project-details", { state: { ...project } })
          }
          className=" p-4 border-2 border-black w-44"
        >
          <h2>{project.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Projects;
