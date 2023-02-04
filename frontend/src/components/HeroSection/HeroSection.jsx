import Link from 'next/link';
import styles from './HeroSection.module.scss'
import { useEffect, useRef } from 'react'
import { BsArrowUpRight } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai'
import HeroImg1 from '@assets/images/hero_img1.jpg';
import HeroImg from '@assets/images/hero_img.jpg';

const HeroSection = () => {

	return (
		<div className={styles.Hero_section + " Container"}>

			Hero Section

		</div>
	)
}

export default HeroSection