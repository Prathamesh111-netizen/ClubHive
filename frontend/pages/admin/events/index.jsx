import BreadCrumb from '@components/Navbar/BreadCrumb'
import { toast } from 'react-toastify';
import API from '@shared/API';
import React, { useEffect, useState } from 'react'
import styles from './events.module.scss'

const index = () => {
    const [events, setEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = async () => {
        try {
            const res = await API.get(`/event/comm/`);
            setEvents(res.data);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <div className={styles.Event}>
            <BreadCrumb />

            <div className={styles.card_container}>

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
                                        "https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"
                                    }
                                    alt=""
                                />
                                <div className={styles.card_right}>
                                    <h3>Hackktheworld</h3>
                                    <p>Hosted by CSI committee</p>
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
                    );
                })}

            </div>
        </div>
    )
}

export default index