import BreadCrumb from "@components/Navbar/BreadCrumb";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import Calendar from "@components/Calendar/Calendar";
import Loader from "@components/Loader/Loader";

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

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/rooms")
  //     .then((response) => {
  //       setRooms(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  // if (isLoading) {
  //   return <Loader />;
  // }

  if (showModal) {
    return (
      <div>
        <button onClick={setShowModal(false)}>Modal Off</button>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Modal Title</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  I always felt like I could do anything. That’s the main thing
                  people are controlled by! Thoughts- their perception of
                  themselves! They're slowed down by their perception of
                  themselves. If you're taught you can’t do anything, you won’t
                  do anything. I was taught I could do everything.
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    );
  } else if (switchToCalendar) {
    return (
      <div>
        <div>
          <div class="flex align-center justify-center my-6 bg-red-100">
            <h1 class="text-6xl">
              <span>Room No: </span>
              <input
                contentEditable
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
    );
  }
};

export default index;
