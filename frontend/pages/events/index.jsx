import React, { useEffect, useState } from 'react'
import styles from './events.module.scss';
import { SiHackthebox } from 'react-icons/si';
import { BiTimeFive } from 'react-icons/bi'
import { IoPricetagOutline } from 'react-icons/io5'

const index = () => {
    const [events, setEvents] = useState([
        {
            id: '1',
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
            active: true,
        },
        {
            id: '2',
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
            active: false,
        },
        {
            id: '3',
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
            active: false,
        },
        {
            id: '4',
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
            active: false,
        },
    ]);
    const [currentActiveEvent, setCurrentActiveEvent] = useState(events[0]);

    useEffect(() => {
        if (events.length > 0) {
            const activeEvent = events.find(event => event.active === true);
            setCurrentActiveEvent(activeEvent);
        }
    }, [events])

    return (
        <div className={styles.Events + " Container padding_top_nav"}>
            <div className={styles.card_container + " hide_scrollbar sticky_top"}>
                {
                    events.map(event => {
                        return (
                            <div className={styles.Event_card} onClick={() => {
                                const newEvents = events.map(e => {
                                    if (e.id === event.id) {
                                        e.active = true;
                                    } else {
                                        e.active = false;
                                    }
                                    return e;
                                })
                                setEvents(newEvents);
                            }}>
                                <div className={styles.card_top}>
                                    <img src={"https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"} alt="" />
                                    <div className={styles.card_right}>
                                        <h3>Hackktheworld</h3>
                                        <p>Hosted by CSI committee</p>
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
                        )
                    })
                }
            </div>
            <div className={styles.right_container + " hide_scrollbar"}>
                <div className={styles.header}>
                    <img src={"https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"} alt="" />
                    <div className={styles.right}>
                        <h2>{currentActiveEvent.title}</h2>
                        <p>{currentActiveEvent.type}</p>
                        <div className={styles.info}>
                            <div className={styles.event_type}>
                                <SiHackthebox />
                                Hackathon
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
                        <div className={styles.utils}>
                            <div className={styles.btn_primary}>
                                Register
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    <h1>About The Event</h1>
                    <div dangerouslySetInnerHTML={{ __html: currentActiveEvent?.desc || '' }} />
                </div>
            </div>
        </div>
    )
}

export default index