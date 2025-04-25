import { useEffect, useState } from 'react'

export const useValidation = (
	type: 'login' | 'register',
	values: {
		email: string
		password: string
		confirmPassword?: string
	}
) => {
	const [errors, setErrors] = useState<{
		email?: string
		password?: string
		confirmPassword?: string
	}>({})

	useEffect(() => {
		const newErrors: typeof errors = {}

		if (!values.email) {
			newErrors.email = 'Email is required'
		} else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
			newErrors.email = 'Email is invalid'
		}

		if (!values.password) {
			newErrors.password = 'Password is required'
		} else if (values.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters'
		}

		if (type === 'register') {
			if (values.password !== values.confirmPassword) {
				newErrors.confirmPassword = 'Passwords do not match'
			}
		}

		setErrors(newErrors)
	}, [values, type])

	return { errors, isValid: Object.keys(errors).length === 0 }
}
