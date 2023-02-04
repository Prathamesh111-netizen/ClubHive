import HeroSection from '@components/HeroSection/HeroSection';
import React from 'react'
import styles from './HomePage.module.scss';

const HomePage = () => {
    return (
        <div className={styles.Home_page + " Container padding_top_nav"}>
            <HeroSection />
        </div>
    )
}

export default HomePage