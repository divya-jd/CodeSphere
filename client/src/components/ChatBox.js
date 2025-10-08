import { useState, useEffect } from "react";

export default function ChatBox({ socket, roomId, user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("newMessage", (msg) => setMessages((m) => [...m, msg]));
    return () => socket.off("newMessage");
  }, [socket]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { roomId, user, message });
      setMessage("");
    }
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((m, i) => (
          <p key={i}><b>{m.user}:</b> {m.message}</p>
        ))}
      </div>
      <div className="input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
