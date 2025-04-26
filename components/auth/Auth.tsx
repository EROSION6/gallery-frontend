'use client'

import { saveTokenLocalStorage } from '@/helper/localst.helper'
import { useValidation } from '@/hooks/useValidation'
import { AuthService } from '@/services/auth.service'
import { useState } from 'react'
import { InputField, TabButton } from '../ui'
import s from './Auth.module.scss'

export const Auth = ({
	initialOpen,
	onClose,
}: {
	initialOpen?: boolean
	onClose?: () => void
}) => {
	const [isOpen, setIsOpen] = useState(initialOpen)
	const [activeTab, setActiveTab] = useState<'Login' | 'Register'>('Login')
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [apiError, setApiError] = useState<string | null>(null)

	const { errors, isValid } = useValidation(
		activeTab === 'Login' ? 'login' : 'register',
		formValues
	)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setApiError(null)

		if (!isValid) return

		try {
			const user = {
				email: formValues.email,
				password: formValues.password,
			}

			if (activeTab === 'Register') {
				const data = await AuthService.register(user)
				if (data?.token) {
					saveTokenLocalStorage('token', data.token)
					setActiveTab('Login')
				}
			} else {
				const data = await AuthService.login(user)
				if (data?.token) {
					saveTokenLocalStorage('token', data.token)
					setIsOpen(false)
				}
			}
		} catch (error: any) {
			setApiError(error.response?.data?.message || 'An error occurred')
		}
	}

	const handleChange = (field: keyof typeof formValues) => (value: string) => {
		setFormValues(prev => ({ ...prev, [field]: value }))
	}

	const handleClose = () => {
		setIsOpen(false)
		onClose?.()
	}

	if (!isOpen) return null

	return (
		<div className={s.modal}>
			<div className={s.content} onClick={e => e.stopPropagation()}>
				<div className={s.tabs}>
					<TabButton
						active={activeTab === 'Register'}
						onClick={() => setActiveTab('Register')}
					>
						Register
					</TabButton>
					<TabButton
						active={activeTab === 'Login'}
						onClick={() => setActiveTab('Login')}
					>
						Login
					</TabButton>
				</div>

				<form onSubmit={handleSubmit}>
					{apiError && <div className={s.error}>{apiError}</div>}

					<InputField
						label='Email'
						type='email'
						placeholder='mail@example.com'
						value={formValues.email}
						onChange={handleChange('email')}
						error={errors.email}
					/>

					<InputField
						label='Password'
						type='password'
						placeholder='Enter your password'
						value={formValues.password}
						onChange={handleChange('password')}
						error={errors.password}
					/>

					{activeTab === 'Register' && (
						<InputField
							label='Confirm Password'
							type='password'
							placeholder='Confirm your password'
							value={formValues.confirmPassword}
							onChange={handleChange('confirmPassword')}
							error={errors.confirmPassword}
						/>
					)}

					<button type='submit' className={s.submitButton} disabled={!isValid}>
						{activeTab}
					</button>
				</form>
			</div>
		</div>
	)
}
