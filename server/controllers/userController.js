import jwt from "jsonwebtoken";

const users = new Map(); // In-memory mock store

export const registerUser = async (req, res) => {
  const { username } = req.body;
  if (users.has(username))
    return res.status(400).json({ message: "Username already exists" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "6h" });
  users.set(username, { username, token });
  res.status(201).json({ username, token });
};

export const loginUser = async (req, res) => {
  const { username } = req.body;
  if (!users.has(username))
    return res.status(404).json({ message: "User not found" });

  const { token } = users.get(username);
  res.status(200).json({ username, token });
};

export const getAllUsers = (req, res) => {
  res.json([...users.keys()]);
};
