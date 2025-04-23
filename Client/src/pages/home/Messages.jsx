import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Messages({ message }) {
  const { userProfile } = useSelector((state) => state.userSlice);
  const { selectedUser } = useSelector((state) => state.userSlice);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <>
      <div
        ref={messageRef}
        className={`chat ${
          userProfile?._id === message?.senderId ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                userProfile?._id === message?.senderId
                  ? userProfile?.avatar
                  : selectedUser?.avatar
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">
            {message?.createdAt
              ? new Date(message?.createdAt).toLocaleString()
              : "Just now"}
          </time>
        </div>
        <div className="chat-bubble chat-bubble-success">
          {message?.message}
        </div>
      </div>
    </>
  );
}

export default Messages;
