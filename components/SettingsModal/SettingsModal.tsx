'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import s from './SettingsModal.module.scss'

interface SettingsModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
	const [theme, setTheme] = useState('dark')
	const [notifications, setNotifications] = useState(true)
	const [showToast, setShowToast] = useState(false)

	const handleThemeChange = (selectedTheme: string) => {
		if (selectedTheme === 'light') {
			setShowToast(true)
			setTimeout(() => setShowToast(false), 3000)
			return
		}
		setTheme(selectedTheme)
	}

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={s.settingsModal}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<motion.div
							className={s.settingsContent}
							initial={{ y: 50, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 50, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
						>
							<button className={s.closeButton} onClick={onClose}>
								×
							</button>

							<h3>Настройки</h3>

							<div className={s.settingsGroup}>
								<h4>Тема</h4>
								<div className={s.themeOptions}>
									<button
										className={`${s.themeButton} ${
											theme === 'light' ? s.active : ''
										}`}
										onClick={() => handleThemeChange('light')}
									>
										Светлая
									</button>
									<button
										className={`${s.themeButton} ${
											theme === 'dark' ? s.active : ''
										}`}
										onClick={() => handleThemeChange('dark')}
									>
										Тёмная
									</button>
									<button
										className={`${s.themeButton} ${
											theme === 'system' ? s.active : ''
										}`}
										onClick={() => handleThemeChange('system')}
									>
										Системная
									</button>
								</div>
							</div>

							<div className={s.settingsGroup}>
								<h4>Уведомления</h4>
								<label className={s.switch}>
									<input
										type='checkbox'
										checked={notifications}
										onChange={e => setNotifications(e.target.checked)}
									/>
									<span className={s.slider}></span>
									<span className={s.switchText}>
										{notifications ? 'Включены' : 'Выключены'}
									</span>
								</label>
							</div>

							<div className={s.settingsActions}>
								<button className={s.saveButton}>Сохранить</button>
								<button className={s.cancelButton} onClick={onClose}>
									Отмена
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showToast && (
					<motion.div
						className={s.toast}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
					>
						<div className={s.toastContent}>
							<span className={s.toastIcon}>⚠️</span>
							<span>Светлая тема временно недоступна</span>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
