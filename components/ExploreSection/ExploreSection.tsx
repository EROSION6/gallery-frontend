'use client'

import { useRef, useState } from 'react'
import s from './ExploreSection.module.scss'

export const ExploreSection = () => {
	const galleryRef = useRef<HTMLDivElement>(null)
	const [isAtStart, setIsAtStart] = useState(true)
	const [isAtEnd, setIsAtEnd] = useState(false)

	const checkScrollPosition = () => {
		if (!galleryRef.current) return

		const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current
		setIsAtStart(scrollLeft === 0)
		setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 1)
	}

	const scroll = (direction: 'left' | 'right') => {
		if (!galleryRef.current) return

		const { scrollLeft, clientWidth } = galleryRef.current
		const scrollAmount = clientWidth * 0.8

		galleryRef.current.scrollTo({
			left:
				direction === 'left'
					? scrollLeft - scrollAmount
					: scrollLeft + scrollAmount,
			behavior: 'smooth',
		})
	}

	return (
		<section className={s.variants}>
			<h3>Исследовать больше</h3>

			<div className={s.navigation}>
				<button
					onClick={() => scroll('left')}
					disabled={isAtStart}
					className={`${s.navButton} ${isAtStart ? s.disabled : ''}`}
				>
					←
				</button>

				<button
					onClick={() => scroll('right')}
					disabled={isAtEnd}
					className={`${s.navButton} ${isAtEnd ? s.disabled : ''}`}
				>
					→
				</button>
			</div>

			<div
				ref={galleryRef}
				className={s.varGallery}
				onScroll={checkScrollPosition}
			>
				{Array.from({ length: 6 }, (_, i) => (
					<div key={`explore-${i}`} className={s.card_gall}>
						<div className={s.descr_card}>
							<span>везде</span>
							<h4>TIJN EYEWEAR</h4>
							<button>СМОТРЕТЬ КЕЙС</button>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
