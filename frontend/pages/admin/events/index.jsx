import BreadCrumb from '@components/Navbar/BreadCrumb'
import { toast } from 'react-toastify';
import API from '@shared/API';
import React, { useContext, useEffect, useState } from 'react'
import styles from './events.module.scss'
import { LoaderContext } from 'pages/_app';

const index = () => {
    const [events, setEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    useEffect(() => {
        getEvents();
    }, [])

    const {loading, setLoading} = useContext(LoaderContext);

    const getEvents = async () => {
        try {
            setLoading(true);
            const res = await API.get(`/event/comm/${user.committee}`, {
            });
            setEvents(res.data.event);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
        finally {
            setLoading(false);
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