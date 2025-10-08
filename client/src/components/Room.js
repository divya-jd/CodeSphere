import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Room() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim()) navigate(`/room/${roomId}`);
  };

  const handleCreate = () => {
    const newRoom = `room-${Math.floor(Math.random() * 10000)}`;
    navigate(`/room/${newRoom}`);
  };

  return (
    <div className="room-container">
      <h2>Join or Create a Room</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <div>
        <button onClick={handleJoin}>Join</button>
        <button onClick={handleCreate}>Create New</button>
      </div>
    </div>
  );
}
