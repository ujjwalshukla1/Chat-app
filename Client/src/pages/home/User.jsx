import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/User.slice";

function User({ userDetails }) {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { onlineUsers } = useSelector((state) => state.socketSlice);
  const isOnline =  onlineUsers?.includes(userDetails?._id);
  
  const handleClick = () => {
    dispatch(setSelectedUser(userDetails));
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-2 p-2 py-3 m-2 cursor-pointer border-b-2 border-gray-600 rounded-md ${
        userDetails?._id === selectedUser?._id && "bg-gray-200"
      } `}
    >
      <div className={`avatar online`}>
        <div className="w-10 rounded-full">
          <img src={userDetails?.avatar} />
        </div>
      </div>
      <div className="text-primary flex flex-col">
        <h2>{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.userName}</p>
        <p>{
          isOnline ? (
            <span className="text-green-500 text-xs">Online</span>
          ) : (
            <span className="text-red-500 text-xs">Offline</span>
          )
          }</p>
      </div>
    </div>
  );
}

export default User;
