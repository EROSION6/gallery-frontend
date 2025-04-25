import s from './TabButton.module.scss'

interface TabButton {
	active: boolean
	onClick: () => void
	children: React.ReactNode
}

export const TabButton = ({ active, onClick, children }: TabButton) => {
	return (
		<button
			className={s.tab}
			onClick={onClick}
			style={{
				borderColor: active ? 'rgba(255, 255, 255, 0.07)' : 'transparent',
			}}
		>
			{children}
		</button>
	)
}
