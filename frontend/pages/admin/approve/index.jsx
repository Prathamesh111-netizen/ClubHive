import React, { useState } from 'react'
import styles from './approve.module.scss'
import { SiHackthebox } from 'react-icons/si';
import { BiTimeFive } from 'react-icons/bi'
import { IoPricetagOutline } from 'react-icons/io5'
import Modal from '@components/UI/Modal/Modal';

const index = () => {
    const [events, setEvents] = useState([
        {
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
        },
        {
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
        },
        {
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
        },
        {
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
        },
        {
            title: 'johndoe',
            profilePic: "",
            type: "admin",
            created: '',
        },
    ])
    const [show, setShow] = useState(false);
    const [approvedEvents, setApprovedEvents] = useState([
        {

        }
    ])

    const [currentEvent, setCurrentEvent] = useState(null);



    return (
        <div className={styles.Approve}>
            <div className={styles.card_container}>
                <Modal show={show} hideBackdrop={() => setShow(false)} >
                    <div className={styles.Current_event}>
                        {
                            currentEvent && (
                                <div>{currentEvent.title}</div>
                            )
                        }
                    </div>
                </Modal>
                {
                    events.map((event, index) => {
                        return (
                            <div className={styles.Approve_event_card} key={index} onClick={() => {
                                setShow(true)
                                setCurrentEvent(event)
                            }}>
                                <div className={styles.card_top}>
                                    <img src={"https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/banner/63dc010270fb6_hackathon.png?d=1920x557"} alt="" />
                                    <div className={styles.card_right}>
                                        <h3>Hackktheworld</h3>
                                        <p>Hosted by CSI committee</p>
                                    </div>
                                </div>
                                <div className={styles.utils}>
                                    <div className={styles.approve}>
                                        Approve
                                    </div>
                                    <div className={styles.reject}>
                                        Reject
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

        </div>
    )
}

export default index