require("dotenv").config();
const Code = require("./models/Code.model");
const Canvas = require("./models/Canvas.model");
const connectDB  = require("./db.js");

connectDB();

const io = require("socket.io")(process.env.SOCKET_PORT, {
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_SERVER,
    transports: ["websocket", "polling"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", async (meetingId) => {
    socket.join(meetingId);
    console.log(socket.id, "join-room");
    socket.on("get-document", async (documentId) => {
      const document = await findOrCreateDocument(documentId);
      socket.emit("load-document", document.data);

      socket.on("send-changes", (delta) => {
        socket.broadcast.to(meetingId).emit("receive-changes", delta);
      });

      socket.on("save-document", async (data) => {
        await Code.findByIdAndUpdate(documentId, { data });
        // find document by id from astra -> get old fileCID -> delete old file from lighthouse storage
        // upload new file to lighthouse -> save new fileCID to astra
      });
    });

    socket.on("canvas-data", async (data) => {
      console.log(socket.id, "canvas-data");
      socket.broadcast.to(meetingId).emit("canvas-data", data);
      await Canvas.findOneAndUpdate(
        { _id: meetingId },
        { $set: { data: data } },
        { upsert: true, new: true }
      );
    });

    socket.on("get-canvas", async (meetingId) => {
      console.log(socket.id, "get-canvas");
      const canvas = await findOrCreateCanvas(meetingId);
      socket.emit("load-canvas", canvas.data);
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Code.findById(id);
  if (document) return document;
  return await Code.create({ _id: id, data: "" });
}

async function findOrCreateCanvas(id) {
  if (id == null) return;
  const canvas = await Canvas.findById(id);
  if (canvas) return canvas;
  return await Canvas.create({ _id: id, data: "" });
}
