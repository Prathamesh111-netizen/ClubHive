import React from 'react'
import styles from './EventCard.module.scss'
import { SiHackthebox } from 'react-icons/si';
import { BiTimeFive } from 'react-icons/bi'
import { IoPricetagOutline } from 'react-icons/io5'

const EventCard = () => {
    return (
        <div className={styles.Event_card}>
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
}

export default EventCard