import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getAllProjects } from "../Redux/Slices/Projectslices";
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
          className=" flex justify-center  items-center p-4 pr-0 border-2 border-black w-44"
        >
          <h2
            onClick={() =>
              navigate("/project-details", { state: { ...project } })
            }
            className=" flex-grow"
          >
            {project.name}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default Projects;
