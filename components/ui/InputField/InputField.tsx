import s from './InputField.module.scss'

interface InputField {
	label: string
	type: string
	placeholder: string
	value: string
	onChange: (value: string) => void
	error?: string
}

export const InputField = ({
	label,
	type,
	placeholder,
	value,
	onChange,
	error,
}: InputField) => (
	<div className={s.input}>
		<label>{label}</label>
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={e => onChange(e.target.value)}
		/>
		{error && <span className={s.error}>{error}</span>}
	</div>
)
