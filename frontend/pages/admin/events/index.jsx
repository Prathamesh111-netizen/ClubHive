import BreadCrumb from '@components/Navbar/BreadCrumb'
import { toast } from 'react-toastify';
import API from '@shared/API';
import React, { useEffect, useState } from 'react'
import styles from './events.module.scss'

const index = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    }, [])

    const getEvents = async () => {
        try {
            const res = await API.get('/event/comm/');
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
                {

                }
            </div>
        </div>
    )
}

export default index