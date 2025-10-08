import Session from "../models/Session.js";

export const getAllSessions = async (req, res) => {
  const sessions = await Session.find();
  res.json(sessions);
};

export const createSession = async (req, res) => {
  const { roomId } = req.body;
  const session = await Session.create({ roomId });
  res.status(201).json(session);
};
