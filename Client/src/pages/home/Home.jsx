import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket, setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/Message.slice";
import { FaBars } from "react-icons/fa"; 

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAuthenticated, userProfile } = useSelector((state) => state.userSlice);
  const { socket } = useSelector((state) => state.socketSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(initializeSocket(userProfile?._id));
    }
  }, [isAuthenticated, dispatch, userProfile?._id]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage));
    });
    return () => {
      socket.close();
    };
  }, [socket, dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Hamburger menu for mobile */}
      <button
        className="felx z-50 p-2 text-white rounded-md shadow md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars className="w-6 h-6 text-white" />
      </button>

      {/* Sidebar toggling */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:max-w-[20em] z-40 text-white`}
      >
        <SideBar />
      </div>

      {/* Main message area */}
      <div className="flex-1">
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
