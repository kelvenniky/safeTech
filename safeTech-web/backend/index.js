import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Ensure the correct file extension
import router from './routes/index.js'; // Ensure the correct file extension
import { Server } from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser'; // Optional if using express.json()


dotenv.config(); // Load environment variables

const app = express();
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" }
});

// Store online users
export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log('User connected', userId);

  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);




const PORT = process.env.PORT || 8080; // Corrected the order

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log('Server is running on port', PORT);
  });
});