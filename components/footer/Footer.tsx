import s from './Footer.module.scss'

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.left}>
				<h4>giulia gartner 2025</h4>
			</div>
			<div className={s.center}>
				<button>Youtube</button>
				<button>Telegram</button>
				<button>VK</button>
			</div>
			<div className={s.right}>
				<h4>дизайн и разработка ✦ thomas bosc</h4>
			</div>
		</footer>
	)
}
