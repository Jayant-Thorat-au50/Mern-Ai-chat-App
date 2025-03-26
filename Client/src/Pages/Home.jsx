import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllusers, getProfile, logout } from "../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { createProject } from "../Redux/Slices/Projectslices";

function Home() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const projectList = useSelector((state) => state.projectstate.projects);

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
      console.log("created");
    }
  };

  return (
    <>
      <div className=" flex flex-col gap-5">
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
            type="text"
            className=" w-full"
            onChange={() => {}}
            value={userData.email}
          />
        )}
      </div>

      <div>
        {isLoggedIn && <button onClick={handlegetProfile}>get user</button>}
      </div>

      {isLoggedIn && (
        <button onClick={() => setCreateProjectModal(true)}>
          create project
        </button>
      )}

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
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="My Awesome Project"
              value={newProject.name}
              onChange={(e) => setNewProject({ name: e.target.value })}
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
