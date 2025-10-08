import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Editor from "../components/Editor";
import ChatBox from "../components/ChatBox";

const socket = io(import.meta.env.VITE_SERVER_URL || "http://localhost:5000");

export default function Workspace() {
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [username] = useState(`User-${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    socket.emit("joinRoom", { roomId: id, username });
    socket.on("loadCode", (content) => setCode(content));
    socket.on("codeUpdate", (newCode) => setCode(newCode));

    return () => socket.disconnect();
  }, [id, username]);

  const handleChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId: id, code: newCode });
  };

  return (
    <div className="workspace">
      <Editor code={code} onChange={handleChange} />
      <ChatBox socket={socket} roomId={id} user={username} />
    </div>
  );
}
