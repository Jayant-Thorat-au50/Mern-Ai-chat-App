import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllusers, getProfile, logout } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { createProject, getAllProjects } from "../Redux/Slices/Projectslices";
import Projects from "../component/projects.jsx";

function Home() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const projects = useSelector((state) => state.projectstate.projectsList);

  const [newProject, setNewProject] = useState({
    name: "",
  });

  const [createProjectModalOpen, setCreateProjectModal] = useState(false);

  const deleteAllusersfromCo = async () => {
    await dispacth(deleteAllusers());
  };

  const handlelogout = async () => {
    const response = await dispacth(logout());
    console.log(response);
    if (response.payload.success) {
      navigate("/");
    }
  };

  const handlegetProfile = async () => {
    const response = await dispacth(getProfile());
    console.log(response);
  };

  const createNewProject = async (e) => {
    e.preventDefault();

    const response = await dispacth(createProject(newProject));

    if (response.payload.success) {
      await dispacth(getAllProjects());
      setNewProject({
        name: "",
      });
      setCreateProjectModal(false);
    }
  };

  return (
    <>
      <header className=" flex justify-between items-center bg-gray-800 text-white p-4">
        <div className=" flex gap-5">
          <div>Home</div>
          <button onClick={deleteAllusersfromCo}>delete</button>
          {isLoggedIn ? (
            <button onClick={handlelogout}>logout</button>
          ) : (
            <button
              onClick={() => {
                navigate("/loginModall");
              }}
            >
              login
            </button>
          )}
        </div>
        <div className="flex flex-col gap-5 w-1/2">
          {userData && (
            <input
              type="text "
              className=" w-full text-black "
              onChange={() => {}}
              value={userData.email}
            />
          )}
        </div>
        <div>
          {isLoggedIn && <button onClick={handlegetProfile}>get user</button>}
        </div>
      </header>

      <div className=" w-full">
        {projects.map((project) => {
          <div className=" flex items-center gap-2 justify-center">
            <h1 className=" text-black text-xl">{project.name}</h1>;
            <button className=" text-black">delete</button>
          </div>;
        })}
      </div>

      <div className=" flex flex-col">
        {isLoggedIn && (
          <button onClick={() => setCreateProjectModal(true)}>
            create project
          </button>
        )}
      </div>

      {/* projects List */}

      {isLoggedIn && (
        <button
          onClick={() => setCreateProjectModal(true)}
          className=" border-2 flex items-center justify-between gap-2 w-44 border-blue-500 p-4"
        >
          <span> Add project</span>
          <FaPlus />
        </button>
      )}

      {isLoggedIn && <Projects />}

      {/* create project modal */}

      {createProjectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
          <form
            noValidate
            onSubmit={createNewProject}
            className="animate-fadeInScale bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-2xl rounded-2xl p-6 max-w-sm w-full relative"
          >
            <button
              onClick={() => setCreateProjectModal(!createProjectModalOpen)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Enter Project Name
            </h2>

            <input
              type="text"
              className="w-full p-3 border rounded-lg text-black outline-none"
              placeholder="My Awesome Project"
              value={newProject.name}
              onChange={(e) => setNewProject({ name: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createNewProject(e);
                }
              }}
              required
            />

            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Home;
