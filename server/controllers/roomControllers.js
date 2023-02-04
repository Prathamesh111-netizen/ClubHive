import Room from "../models/room.model.js";

const createRoom = async (req, res, next) => {
  try {
    const { roomNo, type, capacity } = req.body;
    if (roomNo && type && capacity) {
      const room = await Room.create({
        roomNo,
        type,
        capacity,
      });
      res.status(201).json({
        success: true,
        room: room,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json({
      success: true,
      rooms: rooms,
    });
  } catch (error) {
    next(error);
  }
};

export { createRoom, getRooms };
