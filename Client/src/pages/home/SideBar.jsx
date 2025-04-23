import React, { useEffect } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {  getOtherUsersThunk, logoutUserThunk } from "../../store/slice/user/User.thunk";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const { otherUsers, userProfile } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  

  // const { myuser } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (userProfile?._id) {
      dispatch(getOtherUsersThunk()); // Fetch all users after login
    }
  }, [dispatch, userProfile?._id]);

  const handleLogout = () => {
    dispatch(logoutUserThunk());
    navigate("/login");
  };
  return (
    <div className="max-w-[20em] w-full h-screen bg-white rounded-lg flex flex-col ">
      <div>
        <h1 className="text-2xl font-bold text-center py-3 text-primary">
          Chat App
        </h1>
        <h2 className="text-center text-gray-500">Welcome to the chat app</h2>
      </div>
      <div className="p-4 ">
        <label className="input rounded-lg input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="h-full overflow-y-auto">
        {otherUsers?.length > 0 && (
          <>
            {otherUsers.map((user) => (
              <User key={user._id} userDetails={user} />
            ))}
          </>
        )}
      </div>

      <div className="flex items-center justify-between h-[5em] m-2 px-4 rounded-lg py-3 bg-slate-900">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            <img src={userProfile?.avatar} />
          </div>
          <div className="text-primary flex flex-col ml-2 h-10 w-28">
            <h2 className="text-white font-semibold">{userProfile?.fullName}</h2>
            <p className="text-xs text-gray-400">{userProfile?.userName}</p>
          </div>
        </div>
        <button className="btn btn-primary rounded-lg" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
