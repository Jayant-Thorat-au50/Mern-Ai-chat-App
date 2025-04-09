import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/Slices/AuthSlice";
import { addUsersToProject, getProject } from "../Redux/Slices/Projectslices";
import { initializeSocket } from "../Helpers/socketInstance.js";

function ShowProject() {
  const { state } = useLocation();
  const [projectUtilsStates, setProjectUtilsStates] = useState({
    existsingUsersOpen: true,
    addCollabModalOpen: false,
    selectedUsersIds: [],
    project: state,
  });
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);

  const dispacth = useDispatch();
  let { AllUsersList } = useSelector((state) => state.authState);

  const usersToAdd = AllUsersList.filter((user) => {
    return !projectUtilsStates.project.users.some(
      (user1) => user1._id === user._id
    );
  });

  const getAllUsersList = async () => {
    await dispacth(getAllUsers());
  };
  const selectUserIds = async (userId) => {
    setSelectedUsersIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleAddUsers = async () => {
    const response = await dispacth(
      addUsersToProject({
        projectId: projectUtilsStates.project._id,
        users: selectedUsersIds,
      })
    );
    if (response.payload.success) {
      getUpdatedProject(projectUtilsStates.project._id);
      setProjectUtilsStates((prev) => ({ ...prev, addCollabModalOpen: false }));
      setSelectedUsersIds([]);
    }
  };

  const getUpdatedProject = async (id) => {
    const response = await dispacth(getProject(id));
    if (response.payload.success) {
      setProjectUtilsStates((prev) => ({
        ...prev,
        project: response.payload.project,
      }));
    }
  };

  useEffect(() => {
    initializeSocket()
    getUpdatedProject(state._id);
    getAllUsersList();
  }, []);

  return (
    <div className="flex h-screen w-screen">
      {/* left side of the project chat window */}
      <section className=" relative w-3/12 bg-gray-800 text-white pt-0 pb-1 flex flex-col">
        {/* users list in project (side panel) */}
        <div
          className={
            !projectUtilsStates.existsingUsersOpen
              ? "h-full w-full bg-gray-400 absolute top-0 transition-all ease-in-out duration-300 "
              : "h-full w-full bg-gray-400 absolute top-0 transition-all ease-linear -translate-x-96 "
          }
        >
          <header className=" flex items-center bg-white justify-end w-full px-5 py-2">
            <h2 className=" text-black text-center flex-grow">
              {projectUtilsStates.project.name}
            </h2>
            <IoMdClose
              onClick={() =>
                setProjectUtilsStates((prev) => ({
                  ...prev,
                  existsingUsersOpen: !projectUtilsStates.existsingUsersOpen,
                }))
              }
              className=" text-gray-500 hover:text-black transition-all ease-in-out duration-200 p-1 border-gray-800 text-4xl"
            />
          </header>

          {projectUtilsStates.project.users &&
            projectUtilsStates.project.users.map((user) => (
              <div
                key={user._id}
                className=" w-full border border-black border-t-0 bg-slate-300 flex gap-2 justify-start items-center py-2 px-4"
              >
                <span className=" p-2 aspect-square bg-white">
                  <FaUser className=" text-black" />
                </span>
                <p className=" text-lg text-black">{user.email}</p>
              </div>
            ))}
        </div>

        {/* header of the window */}

        <header className=" py-2 flex justify-between items-center px-5 bg-slate-400 w-full">
          <div className=" flex gap-2 items-center border-black px-2 border py-1 rounded-md ">
            <FaPlus />
            <button
              onClick={() => {
                setProjectUtilsStates((prev) => ({
                  ...prev,
                  addCollabModalOpen: true,
                }));
              }}
            >
              Add collaborators
            </button>
            <span className=" border-2 p-1 rounded-full">
              {projectUtilsStates.project.users.length}
            </span>
          </div>
          <TiGroup
            onClick={() =>
              setProjectUtilsStates((prev) => ({
                ...prev,
                existsingUsersOpen: false,
              }))
            }
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

      {projectUtilsStates.addCollabModalOpen && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black/50 backdrop-blur-md p-4">
          <section className="   w-3/12 bg-white rounded-md">
            {/* users list header */}
            <header className=" p-2 text-center border-2  w-full rounded-lg flex justify-between items-center">
              <h2 className=" font-semibold flex-grow text-xl ">
                Select users
              </h2>
              <p
                type="button"
                onClick={() => {
                  setSelectedUsersIds([]);
                  setProjectUtilsStates((prev) => ({
                    ...prev,
                    addCollabModalOpen: false,
                  }));
                }}
                className=" w-1/12 "
              >
                <IoMdClose className=" text-2xl text-gray-600 hover:text-black" />
              </p>
            </header>

            {/* userList */}

            <div className="usersList py-1 max-h-80 overflow-y-auto">
              {usersToAdd &&
                usersToAdd.map((user) => (
                  <div
                    onClick={() => selectUserIds(user._id)}
                    key={user._id}
                    type="button"
                    className=" border-2  px-4 py-2 hover:bg-gray-300 border-t-0 flex justify-between items-center"
                  >
                    <span className=" border-2 rounded-full p-1 border-black">
                      {<FaUser />}
                    </span>
                    <p className=" flex-grow px-4">{user.email}</p>
                    <input
                      type="checkbox"
                      checked={selectedUsersIds.includes(user._id)}
                      onChange={() => {}}
                      className="w-5 h-5"
                    />
                  </div>
                ))}

              {/* button to select the users */}
            </div>
            <div className=" w-full flex justify-center items-center py-2">
              <button
                onClick={handleAddUsers}
                type="button"
                disabled={selectedUsersIds.length === 0}
                className=" w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Add Users
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ShowProject;
