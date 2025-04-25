'use client'

import { AnimatePresence, motion } from 'framer-motion'
import s from './FavoritesModal.module.scss'

interface FavoritesModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function FavoritesModal({
	isOpen,
	onClose,
}: FavoritesModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={s.favoritesModal}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						className={s.favoritesContent}
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 50, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
					>
						<button className={s.closeButton} onClick={onClose}>
							×
						</button>

						<h3>Избранное</h3>

						<div className={s.favoritesGrid}>
							{[1, 2, 3, 4, 5, 6].map(item => (
								<div key={item} className={s.favoriteItem}>
									<div className={s.favoriteImage} />
									<div className={s.favoriteInfo}>
										<span>Проект {item}</span>
										<button>Открыть</button>
									</div>
								</div>
							))}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
