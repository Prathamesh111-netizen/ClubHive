import React, { useState } from 'react'
import styles from './approve.module.scss'
import { SiHackthebox } from 'react-icons/si';
import { BiTimeFive } from 'react-icons/bi'
import { IoPricetagOutline } from 'react-icons/io5'
import Modal from '@components/UI/Modal/Modal';
import { AiFillDelete } from 'react-icons/ai';
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import BreadCrumb from '@components/Navbar/BreadCrumb';

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


    const [users, setUser] = useState([{
        name: "Noman Khan",
        emailId: "noman.khan@spit.ac.in",
        timestamp: "2021-03-12T12:00:00.000Z"
    },
    {
        name: "Noman Khan",
        emailId: "noman.khan@spit.ac.in",
        timestamp: "2021-03-12T12:00:00.000Z"
    }
    ]);



    return (
        <div className={styles.Approve}>
            <BreadCrumb />
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
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className={styles.head_list}>
                    <th scope="col" className={styles.list_item}>Name</th>
                    <th scope="col" className={styles.list_item}>Email</th>
                    <th scope="col" className={styles.list_item}>Timestamp</th>
                    <th scope="col" className={styles.list_item}>Approve</th>
                    <th scope="col" className={styles.list_item}>Reject</th>
                </thead>
                <tbody className={styles.row_list}>
                    {
                        users.map((user, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className={styles.list_item}>{user?.name}</td>
                                <td className={styles.list_item}>{user?.emailId}</td>
                                <td className={styles.list_item}>{user?.timestamp}</td>
                                <td className={"my-auto"}>
                                    <div className={styles.reject + ' flex mb-10'}>
                                        <TiTick />
                                        Approve
                                    </div>
                                </td>
                                <td className={"my-auto"}>
                                    <div className={styles.del + ' flex mb-10'}>
                                        <ImCross className='mx-2' size={10} />
                                        Reject
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default index