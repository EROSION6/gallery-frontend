'use client'

import logo from '@/app/favicon.ico'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import s from './Header.module.scss'

interface IHeader {
	onOpen: () => void
}
export const Header = ({ onOpen }: IHeader) => {
	const [isUserPanelOpen, setIsUserPanelOpen] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const toggleUserPanel = () => {
		setIsUserPanelOpen(!isUserPanelOpen)
	}

	const handleLogin = () => {
		setIsLoggedIn(true)
		onOpen()
	}

	const handleLogout = () => {
		setIsLoggedIn(false)
		setIsUserPanelOpen(false)
	}

	return (
		<header className={s.header}>
			<div className={s.left}>
				<button>Фото</button>
				<button>Видео</button>
			</div>

			<div className={s.middle}>
				<Image src={logo} alt='логотип' />
			</div>

			<div className={s.right}>
				{!isLoggedIn ? (
					<button onClick={handleLogin}>Войти</button>
				) : (
					<button onClick={toggleUserPanel}>Профиль</button>
				)}
				<button>Telegram</button>

				<AnimatePresence>
					{isUserPanelOpen && (
						<motion.div
							className={s.userPanel}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3 }}
						>
							<div className={s.userInfo}>
								<div className={s.avatar}>
									<Image
										src='/default-avatar.jpg'
										alt='Аватар'
										width={60}
										height={60}
									/>
								</div>
								<div className={s.userDetails}>
									<h4>Иван Иванов</h4>
									<p>example@email.com</p>
								</div>
							</div>

							<nav className={s.userMenu}>
								<button className={s.menuItem}>Мои работы</button>
								<button className={s.menuItem}>Настройки</button>
								<button className={s.menuItem}>Избранное</button>
								<button className={s.logoutButton} onClick={handleLogout}>
									Выйти
								</button>
							</nav>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	)
}
