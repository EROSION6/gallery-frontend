'use client'

import icon2 from '@/public/icon2.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import s from './WelcomeSection.module.scss'

export const WelcomeSection = () => {
	const titleRef = useRef<HTMLHeadingElement>(null)
	const textRef = useRef<HTMLParagraphElement>(null)
	const [animatedText, setAnimatedText] = useState('')
	const [isTextVisible, setIsTextVisible] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (!titleRef.current) return

			const title = titleRef.current
			const waves = document.getElementById('waves')
			if (!waves) return

			const titleRect = title.getBoundingClientRect()
			const wavesRect = waves.getBoundingClientRect()
			const wavesMiddle = wavesRect.top + wavesRect.height / 2.5

			if (titleRect.bottom >= wavesMiddle) {
				const distance = titleRect.bottom - wavesMiddle
				const opacity = 1 - distance / (titleRect.height * 0.5)
				title.style.opacity = Math.max(0, opacity).toString()
			} else {
				title.style.opacity = '1'
			}

			if (!textRef.current) return
			const textElement = textRef.current
			const textRect = textElement.getBoundingClientRect()
			const isVisible =
				textRect.top < window.innerHeight && textRect.bottom >= 0

			if (isVisible && !isTextVisible) {
				setIsTextVisible(true)
				animateText()
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isTextVisible])

	const animateText = () => {
		const text =
			'За последние годы я много путешествовал по просторам нашей необъятной Родины. Работа с туристическими организациями России позволила мне по-новому взглянуть на богатую культуру и потрясающую природу этой великой страны. От Камчатки до Калининграда, от северных широт до гор Кавказа - каждый уголок России уникален и вдохновляет меня на новые творческие достижения.'
		let index = 0

		const interval = setInterval(() => {
			if (index < text.length) {
				setAnimatedText(prev => prev + text[index])
				index++
			} else {
				clearInterval(interval)
			}
		}, 10)
	}

	return (
		<section className={s.welcome}>
			<h1 ref={titleRef} className={s.title}>
				Вдохновлено Россией
			</h1>

			<div className={s.imageBg}>
				<Image
					id='waves'
					className={s.waves}
					src='https://example.com/russian-landscape.jpg'
					alt=''
					width={1920}
					height={1080}
					unoptimized
				/>
			</div>

			<div className={s.descr_content}>
				<div className={s.date}>
					<span>Январь 2020</span>
					<Image src={icon2} alt='иконка' loading='lazy' />
					<span>Россия</span>
				</div>

				<p ref={textRef}>{isTextVisible ? animatedText : ''}</p>
			</div>
		</section>
	)
}
