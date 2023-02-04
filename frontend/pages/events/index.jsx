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
    const [filterType, setFilterType] = useState("all");
    const [filterItems, setFilterItems] = useState([]);
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
            setFilterItems(updatedEvents);
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
                const options = {
                    key: "rzp_test_6MRZgh5jRieE5u",
                    currency: ops.currency,
                    amount: ops.amount.toString(),
                    order_id: ops.id,
                    name: "Donation",
                    description: "Thank you for nothing. Please give us some money",
                    image: "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557",
                    handler: function (razorpayResponse) {
                        toast.success("Payment Successful");
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

    useEffect(() => {
        if (filterType === "all") {
            setFilterItems(events);
        } else if (events.length > 0) {
            const filteredEvents = events.filter((event) => {
                return event.category === filterType;
            });
            setFilterItems(filteredEvents);
        }
    }, [filterType]);

    return (
        <div className={styles.Main_container + " Container padding_top_nav"}>
            <div className={styles.filter}>
                <select name="filterType" id="" onChange={(e) => {
                    setFilterType(e.target.value)
                }}>
                    <option value="all" onClick={() => setFilterType("all")}>
                        All
                    </option>
                    <option value="Hackathon" onClick={() => setFilterType("Hackathon")}>
                        Hackathon
                    </option>
                    <option value="Cultural" onClick={() => setFilterType("Cultural")}>
                        Cultural
                    </option>
                    <option value="Esports" onClick={() => setFilterType("Esports")}>
                        Esports
                    </option>
                    <option value="Sports" onClick={() => setFilterType("Sports")}>
                        Sports
                    </option>

                </select>
            </div>
            <div className={styles.Events}>

                <div className={styles.card_container + " hide_scrollbar sticky_top"}>

                    {loading ? <h4>Loading...</h4> : ""}
                    {events.length > 0 &&
                        filterItems.map((event, index) => {
                            return (
                                <div
                                    index={event._id}
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
                                                event.img ||
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
                                                ₹100
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    {
                        filterItems.length === 0 && !loading ? <h1 className="text-3xl font-semibold">No Events Found</h1> : ""
                    }
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
                                                ₹100
                                            </div>
                                        </div>
                                        <div className={styles.utils}>
                                            <div className={styles.btn_primary} onClick={displayRazorpay}>
                                                Register
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.description}>
                                    <h1>About The Event</h1>
                                    <div dangerouslySetInnerHTML={{ __html: currentActiveEvent?.description || '<h3>Description ABout Hackathon here</h3>' }} className={styles.HTML} />
                                </div>
                            </>) : ""
                    }
                </div>
            </div>
        </div>

    );
};

export default index;
