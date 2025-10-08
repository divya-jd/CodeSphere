import winston from "winston";
import morgan from "morgan";
import path from "path";
import fs from "fs";

// ────────────────────────────────
// Log Directory Setup
// ────────────────────────────────
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// ────────────────────────────────
// Winston Logger Configuration
// ────────────────────────────────
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
      ({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.colorize({ all: true }) }),
    new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(logDir, "combined.log") }),
  ],
});

// ────────────────────────────────
// Morgan HTTP Request Logger (Express Middleware)
// ────────────────────────────────
export const httpLogger = morgan("dev", {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

// ────────────────────────────────
// Helper Functions
// ────────────────────────────────
export const logInfo = (msg) => logger.info(msg);
export const logError = (msg) => logger.error(msg);
export const logWarn = (msg) => logger.warn(msg);

export default logger;
