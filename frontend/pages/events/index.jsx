import React, { useContext, useEffect, useState } from "react";
import styles from "./events.module.scss";
import { SiHackthebox } from "react-icons/si";
import { BiTimeFive } from "react-icons/bi";
import { IoPricetagOutline } from "react-icons/io5";
import API from "@shared/API";
import { toast } from "react-toastify";
import { LoaderContext } from "pages/_app";
import { useSelector } from "react-redux";

const index = () => {
  const [events, setEvents] = useState([]);
  const [currentActiveEvent, setCurrentActiveEvent] = useState(
    events.length > 0 && events[0]
  );
  const { loading, setLoading } = useContext(LoaderContext);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (events.length > 0) {
      const activeEvent = events.find((event) => event.active === true);
      setCurrentActiveEvent(activeEvent);
    }
  }, [events]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/event");
      const updatedEvents = res.data.events.map((event, index) => {
        event.active = index === 0 ? true : false;
        return event;
      });
      setEvents(updatedEvents);
      console.log(updatedEvents);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong1");
    }
  };
  // console.log(currentActiveEvent);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const amount = 100;

    var data;
    API.post(`/razorpay/order?amount=${amount}&currency=${"INR"}`, {})
      .then((response) => {
        console.log(response.data);
        const ops = response.data;
        const options = {
          key: "rzp_test_6MRZgh5jRieE5u",
          currency: ops.currency,
          amount: ops.amount.toString(),
          order_id: ops.id,
          name: "Donation",
          description: "Thank you for nothing. Please give us some money",
          image: "http://bangalorefoodbank.com/images/logo.png",
          handler: function (razorpayResponse) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_signature);
            alert("Donation :" + razorpayResponse.razorpay_order_id + " successful");
            
            API.post(`/event_reg/${user._id}`, {
                eventId: currentActiveEvent._id,
            })

          },
          prefill: {
            // name,
            // email,
            // phoneNumber,
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.Events + " Container padding_top_nav"}>
      <div className={styles.card_container + " hide_scrollbar sticky_top"}>
        {loading ? <h4>Loading...</h4> : ""}
        {events.length > 0 &&
          events.map((event) => {
            return (
              <div
                className={styles.Event_card}
                onClick={() => {
                  const newEvents = events.map((e) => {
                    if (e._id === event._id) {
                      e.active = true;
                    } else {
                      e.active = false;
                    }
                    return e;
                  });
                  setEvents(newEvents);
                }}
              >
                <div className={styles.card_top}>
                  <img
                    src={
                      event.profilePic ||
                      "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"
                    }
                    alt=""
                  />
                  <div className={styles.card_right}>
                    <h3>{event.title || "HackUs"}</h3>
                    <p>Hosted by {event.committee || "CSI Community"}</p>
                  </div>
                </div>
                <div className={styles.card_bottom}>
                  <div className={styles.info}>
                    <div className={styles.event_type}>
                      <SiHackthebox />
                      Hackathon
                    </div>
                    <span></span>
                    <div className={styles.event_date}>
                      <BiTimeFive />
                      {"12th - 13th March"}
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
      <div className={styles.right_container + " hide_scrollbar"}>
        {loading ? <h1>Loading...</h1> : ""}
        {currentActiveEvent ? (
          <>
            <div className={styles.header}>
              <img
                src={
                  "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"
                }
                alt=""
              />
              <div className={styles.right}>
                <h2>{currentActiveEvent.title || "CSI Hackathon"}</h2>
                <p>Hosted by {currentActiveEvent.committee || "CSI SPIT"}</p>
                <div className={styles.info}>
                  <div className={styles.event_type}>
                    <SiHackthebox />
                    {currentActiveEvent.type || "Hackathon"}
                  </div>
                  <span></span>
                  <div className={styles.event_date}>
                    <BiTimeFive />
                    {currentActiveEvent.startDate === ""
                      ? "12-03-2021 | 13-03-2021"
                      : `${currentActiveEvent.startDate} | ${currentActiveEvent.endDate}`}
                  </div>
                  <span></span>
                  <div className={styles.price}>
                    <IoPricetagOutline />
                    Free
                  </div>
                </div>
                <div className={styles.utils}>
                  <div className={styles.btn_primary} onClick={displayRazorpay}>
                    Register
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right_container + " hide_scrollbar"}>
                {
                    loading ? <h1>Loading...</h1> : ""
                }
                {
                    currentActiveEvent ? (
                        <>
                            <div className={styles.header}>
                                <img src={currentActiveEvent.img || "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"} alt="" />
                                <div className={styles.right}>
                                    <h2>{currentActiveEvent.title || "CSI Hackathon"}</h2>
                                    <p>Hosted by {currentActiveEvent.committee || "CSI SPIT"}</p>
                                    <div className={styles.info}>
                                        <div className={styles.event_type}>
                                            <SiHackthebox />
                                            {currentActiveEvent.type || "Hackathon"}
                                        </div>
                                        <span></span>
                                        <div className={styles.event_date}>
                                            <BiTimeFive />
                                            {
                                                currentActiveEvent.startDate === "" ? "12-03-2021 | 13-03-2021" : `${currentActiveEvent.startDate} | ${currentActiveEvent.endDate}`
                                            }

                                        </div>
                                        <span></span>
                                        <div className={styles.price}>
                                            <IoPricetagOutline />
                                            Free
                                        </div>
                                    </div>
                                    <div className={styles.utils}>
                                        <div className={styles.btn_primary}>
                                            Register
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <h1>About The Event</h1>
                                <div dangerouslySetInnerHTML={{ __html: currentActiveEvent?.description || '<h3>Description ABout Hackathon here</h3>' }} className={styles.HTML} />
                            </div>
                        </>

                    ) : ""
                }

            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default index;
