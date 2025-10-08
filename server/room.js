const rooms = new Map();

export const joinRoom = (roomId, user) => {
  if (!rooms.has(roomId)) rooms.set(roomId, new Set());
  rooms.get(roomId).add(user);
  return [...rooms.get(roomId)];
};

export const leaveRoom = (roomId, user) => {
  if (rooms.has(roomId)) {
    rooms.get(roomId).delete(user);
    if (rooms.get(roomId).size === 0) rooms.delete(roomId);
  }
  return [...(rooms.get(roomId) || [])];
};
