import React, { useEffect } from "react";
import SideBar from "./SideBar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket, setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/Message.slice";


function Home() {

  const {isAuthenticated} = useSelector((state) => state.userSlice);
  const {userProfile} = useSelector((state) => state.userSlice);
  const  dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socketSlice);  
 
 
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
  },[socket, dispatch]);

  return (
    <div className="flex">
      <SideBar />
      <MessageContainer />
    </div>
  );
}

export default Home;
