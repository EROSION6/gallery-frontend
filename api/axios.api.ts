import axios from 'axios'
import { getTokenLocalStorage } from '../helper/localst.helper'

export const instance = axios.create({
	baseURL: 'http://localhost:3001/api',
})

instance.interceptors.request.use(config => {
	const token = getTokenLocalStorage()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
