import Link from 'next/link';
import styles from './HeroSection.module.scss'
import { useEffect, useRef } from 'react'
import { BsArrowUpRight } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai'
import HeroImg1 from '@assets/images/hero_img1.jpg';
import HeroImg from '@assets/images/hero_img.jpg';

const HeroSection = () => {
	const circle_ref = useRef(null)

	useEffect(() => {
		if (circle_ref.current)
			makeCircleText(circle_ref.current);
	}, [circle_ref])

	const makeCircleText = (element) => {
		const fragmentedHtml = element.innerText.split("").map((char, i) => {
			return `<span style="transform:rotate(${i * 13}deg)">${char}</span>`
		}).join("")

		element.innerHTML = fragmentedHtml
	}

	return (
		<div className='Hero_section container'>

			<div className="hero_content">
				<div className='top_content'>
					<h1>
						BRING
					</h1>
					<div className="content">
						Our mission is to make the college experience more engaging and fun.
					</div>
				</div>
				<div className="middle_content">
					<Link href={'/events'}>
						<div className="circular_asset">
							<div ref={circle_ref} className="circle_text">
								EXPLORE WEBSITES WITH US
							</div>
							<div className="icon">
								<BsArrowUpRight />
							</div>
						</div>

					</Link>
					<h1>
						<span>YOUR</span>
					</h1>
				</div>
				<div className="bottom_content">
					<h1>
						IDEAS
					</h1>
					<div className="content">
						We will provide you with a platform to showcase your ideas.
					</div>
				</div>
				<Link href={'/events'}>
					<div className='btn btn_primary'>
						Get Started
						<AiOutlineRight />
					</div>
				</Link>

			</div>

			<div className="asset_show">
				<div className="asset_mid">
					<div className='asset1'>
						<img src={HeroImg1.src} alt="" />
					</div>
					<div className='asset2'>
						<img src={HeroImg.src} alt="" />
					</div>
					<div className='bottom_asset1'>
						<div className="circle"></div>
						<div className='desc'>Bring your ideas to life with <span>CLUBHIVE</span></div>
					</div>
				</div>

			</div>

		</div>
	)
}

export default HeroSection