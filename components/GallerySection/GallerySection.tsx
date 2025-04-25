'use client'

import { gallery } from '@/shared/constants'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import s from './GallerySection.module.scss'

interface GallerySectionProps {
	activeIndex: number
	setActiveIndex: (index: number) => void
}

export const GallerySection = ({
	activeIndex,
	setActiveIndex,
}: GallerySectionProps) => {
	const galleryRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: galleryRef,
		offset: ['start end', 'end start'],
	})

	const getRandomTransform = (index: number) => {
		const directions = ['-20%', '20%']
		return useTransform(
			scrollYProgress,
			[0, 1],
			['0%', directions[index % directions.length]]
		)
	}

	const handleImageClick = (index: number) => {
		setActiveIndex(index)
		const bigImages = document.querySelectorAll('.big img')
		bigImages[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}

	return (
		<section className={s.gallery} ref={galleryRef}>
			<div className={s.big}>
				{gallery.map((src, index) => (
					<motion.img
						key={`big-${index}`}
						style={{
							y: getRandomTransform(index),
							x: getRandomTransform(index + 1),
							rotate: index % 2 === 0 ? -5 : 5,
						}}
						src={src}
						alt={`Изображение галереи ${index + 1}`}
						className={s.galleryImage}
						loading='lazy'
					/>
				))}
			</div>
			<div className={s.small}>
				{gallery.map((src, index) => (
					<motion.img
						key={`small-${index}`}
						style={{
							y: getRandomTransform(index),
							x: getRandomTransform(index + 1),
							rotate: index % 2 === 0 ? -5 : 5,
						}}
						src={src}
						alt={`Миниатюра галереи ${index + 1}`}
						className={`${s.galleryImage} ${
							index === activeIndex ? s.active : ''
						}`}
						onClick={() => handleImageClick(index)}
						loading='lazy'
					/>
				))}
			</div>
		</section>
	)
}
