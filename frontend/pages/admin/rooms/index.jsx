import BreadCrumb from "@components/Navbar/BreadCrumb";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import Calendar from "@components/Calendar/Calendar";
import Loader from "@components/Loader/Loader";
import Modal from "@components/UI/Modal/Modal";
import styles from "./rooms.module.scss";
import API from "@shared/API";

const index = () => {
  const [rooms, setRooms] = useState([]);
  const [roomSelected, setRoomSelected] = useState(0);
  const [switchToCalendar, setSwitchToCalendar] = useState(false);
  const [oldRoomNo, setOldRoomNo] = useState(roomSelected);
  const [isLoading, setIsLoading] = useState(true);
  const [myEvents, setMyEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roomData, setRoomData] = useState({
    roomNo: "",
    type: "",
    capacity: "",
  });

  useEffect(() => {
    API
      .get(`/rooms/get-rooms`)
      .then((response) => {
        setRooms(response.data.rooms.map((room) => room.roomNo));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }

  const addRoom = async () => {
    let newRoom = {
      roomNo: document.getElementById("roonNumber").value,
      type: document.getElementById("type").value,
      capacity: document.getElementById("capacity").value,
    };
    let newRooms = rooms;
    newRooms.push(newRoom.roomNo);
    setRooms(newRooms);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/create-room`, newRoom)
      .then((response) => {
        // log(response.data);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (switchToCalendar) {
    return (
      <div>
        <div>
          <div class="flex align-center justify-center my-6 bg-red-100">
            <h1 class="text-6xl">
              <span>Room No: </span>
              <input
                value={roomSelected}
                name="newRoomNo"
                onChange={(event) => {
                  setRoomSelected(event.target.value);
                }}
              ></input>
            </h1>
          </div>
          <button
            class="inline"
            onClick={() => {
              let newRooms = rooms.map((room) => {
                if (room != oldRoomNo) {
                  return room;
                } else {
                  return roomSelected;
                }
              });
              setRooms(newRooms);
              setSwitchToCalendar(false);
            }}
          >
            Close
          </button>
        </div>
        <Calendar committeeName={roomSelected}></Calendar>
      </div>
    );
  } else {
    return (
      <>
        <Modal
          show={showModal}
          hideBackdrop={() => setShowModal(false)}
          name="add-user"
        >
          <div className={styles.User_form}>
            <h1 className="text-2xl font-bold">Add Room</h1>
            <form className="flex flex-col gap-5 mt-5">
              <div className={styles.form_item}>
                <label htmlFor="roonNumber" placeholder="Room Number">
                  Room Number
                </label>
                <input type="text" name="roonNumber" id="roonNumber" />
              </div>
              <div className={styles.form_item}>
                <label htmlFor="capacity" placeholder="Capacity">
                  Capacity
                </label>
                <input type="text" name="capacity" id="capacity" />
              </div>
              <div className={styles.form_item}>
                <label htmlFor="type">Type</label>
                <select name="type" id="type">
                  <option value="lab">Lab</option>
                  <option value="hall">Hall</option>
                  <option value="classroom">ClassRoom</option>
                  <option value="auditorium">Auditorium</option>
                  <option value="ground">Ground</option>
                </select>
              </div>

              <button onClick={addRoom} className={styles.btn_primary}>
                Add Room
              </button>
            </form>
          </div>
        </Modal>
        <div className="ml-10">
          <BreadCrumb />
          <div class="min-h-screen flex items-center justify-center">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              {rooms.map((room, i) => {
                return (
                  <div
                    key={i}
                    class="bg-green-100 text-green-500 text-lg font-bold text-center p-10 rounded-lg hover:bg-green-200"
                    onClick={() => {
                      setRoomSelected(room);
                      setOldRoomNo(room);
                      let data = switchToCalendar;
                      // setIsLoading(true);
                      setSwitchToCalendar(!data);
                    }}
                  >
                    {room}
                  </div>
                );
              })}
              <div
                onClick={() => {
                  console.log("clicked");
                  setShowModal(true);
                  // setRooms([...rooms, rooms.length + 1]);
                }}
                class="flex justify-center items-center align-baseline w-24 h-24 bg-green-100 text-green-500 text-lg font-bold text-center rounded-full"
              >
                <button>+</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default index;
