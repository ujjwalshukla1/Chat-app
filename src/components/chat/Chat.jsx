import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";

function Chat() {
  const [emoji, setEmoji] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: "smooth"})
  },[])

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setEmoji(false);
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user-chat">
          <img src="./avatar.png" alt="" />
          <div className="text">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              odio hic saepe iure perspiciatis reprehenderit, placeat error
              veniam id illum sunt soluta corporis labore quam eum nam nulla,
              dolorum nesciunt, ratione eos.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              odio hic saepe iure perspiciatis reprehenderit, placeat error
              veniam id illum sunt soluta corporis labore quam eum nam nulla,
              dolorum nesciunt, ratione eos.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              odio hic saepe iure perspiciatis reprehenderit, placeat error
              veniam id illum sunt soluta corporis labore quam eum nam nulla,
              dolorum nesciunt, ratione eos.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img
              src="https://images.hindustantimes.com/img/2024/08/07/550x309/gojojjk_1723029224787_1723029233059.jpg"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              odio hic saepe iure perspiciatis reprehenderit, placeat error
              veniam id illum sunt soluta corporis labore quam eum nam nulla,
              dolorum nesciunt, ratione eos.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div ref={endRef}></div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setEmoji((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={emoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}

export default Chat;
