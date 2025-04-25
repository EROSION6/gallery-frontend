import { instance } from '../api/axios.api'
import { removeTokenLocalStorage } from '../helper/localst.helper'

export interface IUser {
	email: string
	password: string
}

export const AuthService = {
	async register(user: IUser): Promise<{ token: string } | undefined> {
		const { data } = await instance.post<{ token: string }>('user', user)
		return data
	},

	async login(user: IUser): Promise<{ token: string } | undefined> {
		const { data } = await instance.post<{ token: string }>('auth/login', user)
		return data
	},

	async logout(): Promise<void> {
		removeTokenLocalStorage('')
	},
}
