import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { TiGroup } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaUser, FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/Slices/AuthSlice";
import Markdown from "markdown-to-jsx";
import {
  addUsersToProject,
  getProject,
  removeUsersFromProjectthunck,
} from "../Redux/Slices/Projectslices";
import {
  initializeSocket,
  sendMsg,
  receiveMsg,
} from "../Helpers/socketInstance.js";
import "../../src/App.css";
import toast from "react-hot-toast";
// import { Prism}  from 'react-syntax-highlighter'
import { prism  } from "react-syntax-highlighter/dist/esm/styles/prism";

function ShowProject() {
  const { state } = useLocation();
  const [projectUtilsStates, setProjectUtilsStates] = useState({
    existsingUsersOpen: true,
    addCollabModalOpen: false,
    selectedUsersIds: [],
    project: state,
    message: "",
    removeFromProjectModal: false,
  });
  const [selectedUsersIds, setSelectedUsersIds] = useState([]);
  const [selectedUsersIdsRM, setSelectedUsersIdsRM] = useState([]);
  const [incomingMessageLoading, setIncomingMessageLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [aiMessageLoading, setAiMessageLoading] = useState(false);

  const messageBox = useRef(null);

  const dispacth = useDispatch();
  let { AllUsersList } = useSelector((state) => state?.authState);
  const { user } = useSelector((state) => state?.authState);

  const usersToAdd = AllUsersList?.filter((user) => {
    return !projectUtilsStates.project.users.some(
      (user1) => user1._id === user._id
    );
  });
  const usersToRemove = projectUtilsStates.project.users.filter(
    (u) => user._id !== u._id
  );

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
  const selectUserIdsRemove = async (user) => {
    setSelectedUsersIdsRM((prev) => {
      console.log(prev);

      if (prev.includes(user._id)) {
        return prev.filter((id) => id !== user._id);
      } else {
        return [...prev, user._id];
      }
    });
  };

  const selectAllToRemove = () => {
    if (usersToRemove.length !== selectedUsersIdsRM.length) {
      setSelectedUsersIdsRM(() => []);
      setSelectedUsersIdsRM(() => [...usersToRemove.map((e) => e._id)]);
      console.log(usersToRemove.length, selectedUsersIdsRM.length);
    } else {
      setSelectedUsersIdsRM([]);
    }
  };
  const selectAllToAdd = () => {
    console.log(usersToAdd.length, selectedUsersIds.length);

    if (selectedUsersIds.length !== usersToAdd.length) {
      setSelectedUsersIds(() => []);
      setSelectedUsersIds(() => [...usersToAdd.map((e) => e._id)]);
    } else {
      setSelectedUsersIds(() => []);
    }
  };

  console.log(selectedUsersIds);

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
      window.location.reload();
    }
  };

  const handleRemoveUsers = async (singleuser) => {
    const result = window.confirm("Are you sure to remove these users");

    if (!result) return;
    if (selectedUsersIdsRM.length > 0) {
      const response = await dispacth(
        removeUsersFromProjectthunck({
          projectId: projectUtilsStates.project._id,
          users: selectedUsersIdsRM,
        })
      );

      if (response.payload.success) {
        getUpdatedProject(projectUtilsStates.project._id);
        setProjectUtilsStates((prev) => ({
          ...prev,
          removeFromProjectModal: false,
        }));
        setSelectedUsersIdsRM([]);
      }
    } else {
      const response = await dispacth(
        removeUsersFromProjectthunck({
          projectId: projectUtilsStates.project._id,
          users: [singleuser],
        })
      );

      if (response.payload.success) {
        getUpdatedProject(projectUtilsStates.project._id);
        setProjectUtilsStates((prev) => ({
          ...prev,
          removeFromProjectModal: false,
        }));
        setSelectedUsersIdsRM([]);
      }
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

  const send = () => {
    if (
      state.users.length <= 1 &&
      !projectUtilsStates.message.includes("@ai")
    ) {
      alert("consider adding collaborators first", state.users.length);
      console.log(projectUtilsStates.project);
    }

    if (projectUtilsStates.message.trim() === "") return;
    const sent = sendMsg("project-message", {
      message: projectUtilsStates.message,
      sender: user._id,
    });

    if (!sent) {
      setProjectUtilsStates((prev) => ({ ...prev, message: "" }));
      return;
    }

    setProjectUtilsStates((prev) => ({ ...prev, message: "" }));
    const data = {
      message: projectUtilsStates.message,
      sender: user._id,
    };
    setMessages((prev) => [...prev, { ...data, received: false }]);
    // appendOutgoingMessage(data);
  };

  const sendOnEnter = (e) => {
    if (e.key === "Enter") {
      send();
    }
  };

  const scrollToBottom = () => {
    // messageBox.current.scrollTop = messageBox.current.scrollHeight;
  };

  const appendIncomingMessage = (message) => {
    // incoming message from other users
    const messageBox = document.querySelector(".chat");

    const string = message.sender.indexOf("@");

    let sender;
    if (string) {
      sender = message.sender.slice(0, message.sender.indexOf("@"));
    } else {
      sender = message.sender;
    }

    const color = generateRandomColorStyle();
    const newMessage = document.createElement("div");
    newMessage.className =
      "text-wrap break-words w-fit max-w-80 bg-gray-100 mb-0.5 p-1 my-1 mr-0.5 rounded-xl rounded-tl-none animate-fade-in text-black";

    if (incomingMessageLoading) {
    }
    newMessage.innerHTML = `
    <div class="flex justify-start gap-1 items-center">
            
    <span class=" border-2  p-1.5 rounded-full" ></span>
    <p class= "text-xs font-bold" style="color:${color}" >@${sender}</p>
    </div>
    <p class=" font-semibold">${message.message}</p>
    `;

    messageBox.appendChild(newMessage);
    scrollToBottom();
  };

  const LoadingMessage = () => {
    const parentDiv = document.querySelector(".chat");
    const loadingMessageDiv = document.createElement("div");

    loadingMessageDiv.className = `text-wrap break-words w-fit max-w-80 bg-gray-100 mb-0.5 p-1 my-1 mr-0.5 rounded-xl rounded-tl-none animate-fade-in text-black`;

    loadingMessageDiv.innerHTML = `
     <p>loading...</p>
    `;
    parentDiv.appendChild(loadingMessageDiv);
  };

  const generateRandomColorStyle = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };
  const appendOutgoingMessage = (message) => {
    const color = generateRandomColorStyle();

    // outgoing message from the user
    const messageBox = document.querySelector(".chat");

    const newMessage = document.createElement("div");
    newMessage.className =
      "  text-wrap break-words w-fit max-w-80 mb-0.5 ml-auto bg-gray-100 p-1 my-1 mr-0.5 rounded-xl rounded-tr-none animate-fade-in text-black";
    newMessage.innerHTML = `

    
          <div class="flex justify-start gap-1 items-center">
            
          <span class=" border-2  p-1.5 rounded-full" ></span>
          <p class= "text-xs font-bold" style="color:${color}" >@${user.email.slice(
      0,
      user.email.indexOf("@")
    )}</p>
          </div>
          <p class=" font-semibold">${message.message}</p>
          `;

    messageBox.appendChild(newMessage);
    scrollToBottom();
  };

  // const highlightCode = ({className, children}) => {
  //    const language = className?.replace("lang-", "") || "javascript";
  //    return (
  //        <prism  language={language}>
  //         {children}
  //        </prism>
  //    )
  // }

  useEffect(() => {
    const response = initializeSocket(projectUtilsStates.project._id);

    if (!response) {
      toast.error("connection failed");
    }

    getUpdatedProject(state._id);
    getAllUsersList();
    receiveMsg("project-message", (data) => {
      console.log(data);
      setMessages((prev) => [...prev, { ...data, received: true }]);
      // appendIncomingMessage(data);
    });
  }, []);

  return (
    <div className="flex  flex-col lg:flex-row  h-screen w-screen">
      {/* left side of the project chat window */}
      <section className="  relative lg:w-3/12 w-full min-h-[100vh]  bg-gray-800 text-white pt-0 pb-1 flex flex-col">
        {/* users list in project (side panel) */}
        <div
          className={
            !projectUtilsStates.existsingUsersOpen
              ? "h-full w-full bg-gray-400 absolute top-0 transition-all ease-in-out z-50 duration-300 "
              : "h-full w-full bg-gray-400 absolute top-0 transition-all ease-linear -translate-x-[30rem] "
          }
        >
          <header className=" flex items-center bg-white justify-end w-full lg:px-5 px-1 py-2">
            <h2 className=" text-black text-lg font-bold text-center flex-grow">
              {projectUtilsStates.project.name}
            </h2>
            <div className=" border border-gray-400 hover:border-gray-700 p-0 rounded-full">
              <IoMdClose
                onClick={() =>
                  setProjectUtilsStates((prev) => ({
                    ...prev,
                    existsingUsersOpen: !projectUtilsStates.existsingUsersOpen,
                  }))
                }
                className=" text-gray-500 hover:text-black transition-all ease-in-out duration-200 p-1 border-gray-800 text-4xl"
              />
            </div>
          </header>

          <div></div>
          <div className=" w-full border border-black border-t-0 bg-slate-300 flex gap-2 justify-start items-center py-2 px-4">
            <div className=" w-full flex gap-3 items-center">
              <span className=" p-2 aspect-square bg-white">
                <FaUser className=" text-black" />
              </span>
              <p className=" font-semibold text-sm text-black">{user.email}</p>
              <span className=" text-sm font-semiboldn text-gray-600">you</span>
            </div>
          </div>

          {projectUtilsStates.project.users &&
            usersToRemove.map((user) => (
              <div
                key={user._id}
                className=" w-full border border-black border-t-0 bg-slate-300 flex gap-2 justify-start items-center py-2 px-4"
              >
                <div className=" w-full flex gap-3 items-center">
                  <span className=" p-2 aspect-square bg-white">
                    <FaUser className=" text-black" />
                  </span>
                  <p className=" font-semibold text-sm text-black">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveUsers(user._id)}
                  type="button"
                  className=" text-black text-sm bg-slate-400 border px-2 py-1 rounded"
                >
                  remove
                </button>
              </div>
            ))}
        </div>

        {/* header of the window */}
        <header className=" py-2 flex justify-between  items-center lg:px-5 px-1 bg-slate-400 w-full">
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
            <button
              onClick={() => {
                if (projectUtilsStates.project.users.length > 1) {
                  setProjectUtilsStates((prev) => ({
                    ...prev,
                    removeFromProjectModal: true,
                  }));
                } else {
                  alert(
                    "You are the only user in this project. You cannot remove yourself."
                  );
                }
              }}
            >
              remove
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
        <div
          ref={messageBox}
          className="flex-1  chat overflow-y-auto w-full flex-wrap py-2 gap-5 px-0"
        >
          {messages.map((msg) => {
            const color = generateRandomColorStyle();
            return !msg.received ? (
              <div className="text-wrap break-words w-fit max-w-80 mb-0.5 ml-auto bg-gray-100 p-1 my-1 mr-0.5 rounded-xl rounded-tr-none animate-fade-in text-black">
                                                        {/* sent message */}
                <div className="flex justify-start gap-1 items-center">
                  <span className=" border-2  p-1.5 rounded-full"></span>
                  <p className={`text-xs font-bold`} style={{ color: color }}>
                    @{user.email.slice(0, user.email.indexOf("@"))}
                  </p>
                </div>                                       
                <p className=" font-semibold">{msg.message}</p>
              </div>
            ) : msg.sender == "Gemini 2.0 flash" ? 
                                                    {/* message from ai */}
            (
              <div className=" text-wrap break-words w-11/12 max-w-96 bg-black mb-0.5 p-1 my-1 mr-0.5 rounded-xl rounded-tl-none animate-fade-in text-white overflow-auto">
                <div className="flex justify-start gap-1 items-center">
                  <span className=" border-2  p-1.5 rounded-full"></span>
                  <p className={`text-xs font-bold]`} style={{ color: color }}>
                    @{msg.sender}
                  </p>
                </div>
                <p className=" font-semibold">
                  <Markdown>{msg.message}</Markdown>
                </p>
              </div>
            ) :
                                                       {/* received  message */}
            (
              <div className="text-wrap break-words w-fit max-w-80 bg-gray-100 mb-0.5 p-1 my-1 mr-0.5 rounded-xl rounded-tl-none animate-fade-in text-black">
                <div className="flex justify-start gap-1 items-center">
                  <span className=" border-2  p-1.5 rounded-full"></span>
                  <p className={`text-xs font-bold opacity-5]`} style={{ color: color }}>
                    @{msg.sender.slice(0, msg.sender.indexOf('@'))}
                  </p>
                </div>
                <p className=" font-semibold">{msg.message}</p>
              </div>
            );
          })}
        </div>

        {/* messages input */}
        <div className="mt-4 gap-0.5 mx-0.5 flex">
          <input
            type="text"
            value={projectUtilsStates.message}
            onChange={(e) =>
              setProjectUtilsStates((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
            onKeyDown={sendOnEnter}
            className="w-full focus:outline-none border p-2 rounded bg-gray-700 text-white"
            placeholder="Type a message.................."
          />
          <button
            onClick={send}
            className=" p-3 hover:bg-gray-500  border rounded border-white"
          >
            <FiSend className="text-lg" />
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
                Select users <span className=" bg-red-300 px-2 py-0 rounded-full">{selectedUsersIds.length}</span>
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
              <div
                onClick={selectAllToAdd}
                type="button"
                className=" border-2  px-4 py-2 hover:bg-gray-300 border-t-0 flex justify-between items-center"
              >
                <span className=" border-2 rounded-full p-1 border-black">
                  {<FaUserFriends />}
                </span>
                <p className=" flex-grow px-4">select All</p>
                <input
                  type="checkbox"
                  checked={usersToAdd.length === selectedUsersIds.length}
                  onChange={() => {}}
                  className="w-5 h-5"
                />
              </div>
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
            <div className=" w-full flex justify-center items-center px-2 gap-2 py-2">
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

      {/* remove collaborators modal */}
      {projectUtilsStates.removeFromProjectModal && (
        <div className="fixed inset-0 flex items-center  justify-center bg-black/50 backdrop-blur-md p-4">
          <section className="   w-3/12 bg-white rounded-md">
            {/* users list header */}
            <header className=" p-2 text-center border-2  w-full rounded-lg flex justify-between items-center">
              <h2 className=" font-semibold flex-grow text-xl ">
                Select users <span className=" bg-green-300 px-2 py-0 rounded-full">{selectedUsersIdsRM.length}</span>
              </h2>
              <p
                type="button"
                onClick={() => {
                  setSelectedUsersIds([]);
                  setProjectUtilsStates((prev) => ({
                    ...prev,
                    removeFromProjectModal: false,
                  }));
                }}
                className=" w-1/12 "
              >
                <IoMdClose className=" text-2xl text-gray-600 hover:text-black" />
              </p>
            </header>

            {/* userList */}

            <div className="usersList py-1 max-h-80 overflow-y-auto">
              <div
                onClick={selectAllToRemove}
                key={user._id}
                type="button"
                className=" border-2  px-4 py-2 hover:bg-gray-300 border-t-0 flex justify-between items-center"
              >
                <span className=" border-2 rounded-full p-1 border-black">
                  {<FaUserFriends />}
                </span>
                <p className=" flex-grow px-4">select all</p>
                <input
                  type="checkbox"
                  checked={usersToRemove.length === selectedUsersIdsRM.length}
                  onChange={() => {}}
                  className="w-5 h-5"
                />
              </div>

              {usersToRemove &&
                usersToRemove.map((user) => (
                  <div
                    onClick={() => selectUserIdsRemove(user)}
                    key={user._id}
                    type="button"
                    className={` border-2 px-4 py-2 hover:bg-gray-300 border-t-0 flex justify-between items-center`}
                  >
                    <span className=" border-2 rounded-full p-1 border-black">
                      {<FaUser />}
                    </span>
                    <p className=" flex-grow px-4">{user.email}</p>
                    <input
                      type="checkbox"
                      checked={
                        selectedUsersIdsRM.includes(user._id) ||
                        usersToRemove.length === selectedUsersIdsRM.length
                      }
                      onChange={() => {}}
                      className="w-5 h-5"
                    />
                  </div>
                ))}

              {/* button to select the users */}
            </div>
            <div className=" w-full flex justify-center items-center px-2 gap-2 py-2">
              <button
                onClick={handleRemoveUsers}
                type="button"
                disabled={setSelectedUsersIdsRM.length === 0}
                className=" w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Remove Users
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ShowProject;