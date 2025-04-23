import React, { useEffect } from "react";
import User from "./User";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesThunk } from "../../store/slice/message/Message.thunk";
import SendMessage from "./SendMessage";

function MessageContainer() {
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { messages } = useSelector((state) => state.messageSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessagesThunk({ receiverId: selectedUser._id }));
    }
  }, [selectedUser, dispatch]);

  return (
    <>
      {!selectedUser ? (
        <p className="p-4 w-full flex items-center justify-center text-white font-semibold">
          Please select a chatting partner
        </p>
      ) : (
        <div className="h-screen w-full flex flex-col">
          {/* User Info */}
          <div className="p-3">
            <User userDetails={selectedUser} />
          </div>

          {/* Messages Section */}
          <div className="flex-grow overflow-y-auto p-5">
            {messages?.map((message) => {
              return (
                <Messages
                  key={message?._id}
                  message={message}
                />
              );
            })}
          </div>

          {/* Input Box */}
          <SendMessage />
        </div>
      )}
    </>
  );
}

export default MessageContainer;
