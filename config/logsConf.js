const { format, createLogger, transports } = require("winston");
const { combine, label, json } = format;
require("winston-daily-rotate-file");

//Label
const CATEGORY = "Log Rotation";

//DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/logs-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "3d",
});

const logger = createLogger({
  level: "info",
  format: combine(label({ label: CATEGORY }), json()),
  transports: [fileRotateTransport],
});

module.exports = logger;