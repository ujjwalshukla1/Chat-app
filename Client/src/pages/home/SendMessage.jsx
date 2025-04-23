import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { sendMessagesThunk } from "../../store/slice/message/Message.thunk";

function SendMessage() {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userSlice);

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    dispatch(sendMessagesThunk({ receiverId: selectedUser._id, message }));
    setMessage("");
  };

  return (
    <div className="p-3 flex flex-row items-center gap-2">
      <input
        type="text"
        placeholder="Type here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input input-bordered input-primary w-full"
      />
      <button
        className="btn btn-square btn-outline btn-primary hover:text-white"
        onClick={handleSendMessage}
      >
        <IoSend />
      </button>
    </div>
  );
}

export default SendMessage;
