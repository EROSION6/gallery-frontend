'use client'
import { Auth } from '@/components/auth/Auth'
import { ContactSection } from '@/components/ContactSection/ContactSection'
import { ExploreSection } from '@/components/ExploreSection/ExploreSection'
import { Footer } from '@/components/footer/Footer'
import { GallerySection } from '@/components/GallerySection/GallerySection'
import { Header } from '@/components/Header/Header'
import { WelcomeSection } from '@/components/WelcomeSection/WelcomeSection'
import { useState } from 'react'

export default function Home() {
	const [activeIndex, setActiveIndex] = useState(0)
	const [isOpenModal, setOpenModal] = useState(false)

	const handleOpen = () => {
		setOpenModal(true)
	}

	return (
		<div className='container'>
			<Header onOpen={handleOpen} />
			<WelcomeSection />
			<GallerySection
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
			/>
			<ExploreSection />
			<ContactSection />
			<Footer />
			{/* <Auth initialOpen={!isOpenModal} /> */}
		</div>
	)
}
