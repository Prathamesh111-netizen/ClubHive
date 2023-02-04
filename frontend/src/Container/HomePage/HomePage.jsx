import HeroSection from '@components/HeroSection/HeroSection';
import EventCard from '@components/UI/EventCard/EventCard';
import React from 'react'
import styles from './HomePage.module.scss';

const HomePage = () => {
    return (
        <div className={styles.Home_page + " Container padding_top_nav"}>
            <EventCard />
            <HeroSection />
        </div>
    )
}

export default HomePage