import React, { useState } from "react";
import "./list.css";
import UserInfo from "./userInfo/UserInfo";
import ChatList from "./chatList/ChatList";

function List() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleComponents = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="accordian">
        <div className="hamburger" onClick={toggleComponents}>
          <div className={`line ${isVisible ? "active" : "notActive"}`}></div>
          <div className={`line ${isVisible ? "active" : "notActive"}`}></div>
          <div className={`line ${isVisible ? "active" : "notActive"}`}></div>
        </div>
      <div className="list">
        
        {isVisible && (
          <>
            <UserInfo />
            <ChatList />
          </>
        )}
      </div>
    </div>
  );
}

export default List;
