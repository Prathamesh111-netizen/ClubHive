import React, { useEffect, useState } from "react";
import styles from "./approve.module.scss";
import { SiHackthebox } from "react-icons/si";
import { BiTimeFive } from "react-icons/bi";
import { IoPricetagOutline } from "react-icons/io5";
import Modal from "@components/UI/Modal/Modal";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import API from "@shared/API";

const index = () => {
  const [events, setEvents] = useState([

  ]);
  const user = useSelector((state) => state.auth.user);
  const [show, setShow] = useState(false);
  const [approvedEvents, setApprovedEvents] = useState([{}]);

  const [users, setUsers] = useState([
  ]);

  const [members, setMembers] = useState([
  ]);

  const getEvents = async () => {
    try {
      const res = await API.get(`/event/comm/${user?.committee}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setEvents(res.data.event);
    }
    catch(error) {

    }
    finally {

    }
  };

  useEffect(() => {
    getEvents();
  }, [])

  const [currentEvent, setCurrentEvent] = useState("");

  console.log(user.type)
  console.log(user && (user.type === "Super" || user.type === "Dean Academics" || user.type === "Mentor"))
  console.log(currentEvent.description);
  return (
    <div className={styles.Approve + " text-4xl"}>
      {(user.type === "Super" || user.type === "Dean Academics" || user.type === "Mentor") ?
        <div className={styles.card_container}>
          <Modal show={show} hideBackdrop={() => setShow(false)}>
            <div className={styles.Current_event + " flex flex-col"}>
              {currentEvent && <div className="text-5xl font-extrabold mx-auto">{currentEvent.title || "CSI Hackathon"}</div>}
              <img className="mx-auto my-10" width={500} height={500} src={currentEvent.img} />
              <div className="text-xl" dangerouslySetInnerHTML={{ __html: currentEvent.description ? currentEvent.description : <h3></h3>}}></div>
            </div>
          </Modal>
          {events.map((event, index) => {
            return (
              <div
                className={styles.Approve_event_card}
                key={index}
                onClick={() => {
                  setShow(true);
                  setCurrentEvent(event);
                }}
              >
                <div className={styles.card_top}>
                  <img
                    src={
                      event.img ||
                      "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"
                    }
                    alt=""
                  />
                  <div className={styles.card_right}>
                    <h3>{event.title ||  "CSI Hackathon"}</h3>
                    <p>Hosted by {event.committee || "CSI committee"}</p>
                  </div>
                </div>
                <div className={styles.utils}>
                  <div className={styles.approve}>Approve</div>
                  <div className={styles.reject}>Reject</div>
                </div>
                <div className={styles.card_bottom}>
                  <div className={styles.info}>
                    <div className={styles.event_type}>
                      <SiHackthebox />
                      {event.type || "Hackathon"}
                    </div>
                    <span></span>
                    <div className={styles.event_date}>
                      <BiTimeFive />
                        {
                          event.startDate === "" ? "12-03-2021 | 13-03-2021" : `${event.startDate} | ${event.endDate}`
                        }
                    </div>
                    <span></span>
                    <div className={styles.price}>
                      <IoPricetagOutline />
                      {`₹100`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        :
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className={styles.head_list}>
            <th scope="col" className={styles.list_item}>Name</th>
            <th scope="col" className={styles.list_item}>Email Id</th>
            <th scope="col" className={styles.list_item}>Timestamp</th>
            <th scope="col" className={styles.list_item}>Approve</th>
            <th scope="col" className={styles.list_item}>Reject</th>
          </thead>
          <tbody className={styles.row_list}>
            {
              members.map((user, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className={styles.list_item}>{user?.name}</td>
                  <td className={styles.list_item}>{user?.email}</td>
                  <td className={styles.list_item}>{user?.timestamp}</td>
                  <td className={styles.list_item}>
                    <div className="flex bg-green-500 rounded-3xl w-40 px-4 py-4 text-white">
                      <TiTick />
                      Approve
                    </div>
                  </td>
                  <td className={styles.list_item}>
                    <div className="flex bg-red-500 rounded-3xl w-40 px-4 py-4 text-white">
                      <ImCross className="mx-2" size={10} />
                      Reject
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </div>
  );
};

export default index;
