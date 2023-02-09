import HeroSection from '@components/HeroSection/HeroSection';
import React from 'react'
import styles from './HomePage.module.scss';

const HomePage = () => {
    return (
        <div className={styles.Home_page + " Container"}>
            <HeroSection />
        </div>
    )
}

export default HomePage