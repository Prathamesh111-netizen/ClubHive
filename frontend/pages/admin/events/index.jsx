import BreadCrumb from "@components/Navbar/BreadCrumb";
import { toast } from "react-toastify";
import API from "@shared/API";
import React, { useContext, useEffect, useState } from "react";
import styles from "./events.module.scss";
import { LoaderContext } from "pages/_app";
import { SiHackthebox } from "react-icons/si";
import { BiTimeFive } from "react-icons/bi";
import { IoPricetagOutline } from "react-icons/io5";
import Modal from "@components/UI/Modal/Modal";

const index = () => {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getEvents();
  }, []);

  const { loading, setLoading } = useContext(LoaderContext);

  const getEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/event/comm/${user.committee}`, {});
      setEvents(res.data.event);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.Event}>
      <div className={styles.card_container}>
        <Modal show={show} hideBackdrop={() => setShow(false)}>
          <div className={styles.Current_event}>
            {currentEvent && <div>{currentEvent.title}</div>}
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
                  <h3>{event.title || "CSI Hackathon"}</h3>
                  <p>Hosted by {event.committee || "CSI Committee"}</p>
                </div>
              </div>
              <div className={styles.utils}>
                <div className={styles.status}>{event.approvalStatus}</div>
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
                    12th - 13th March
                  </div>
                  <span></span>
                  <div className={styles.price}>
                    <IoPricetagOutline />
                    Free
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
