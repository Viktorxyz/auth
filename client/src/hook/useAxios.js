import { useEffect } from 'react'
import axios from '../axios.js'
import useRefreshToken from './useRefreshToken.js'
import useAuth from './useAuth.js'

const useAxios = () => {
	const refresh = useRefreshToken()
	const { auth } = useAuth()

	useEffect(() => {
		const reqIntercept = axios.interceptors.request.use(
			config => {
				if (!config.headers['Authorization']) {
					config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
				}
				return config
			}, error => Promise.reject(error)
		)
		const resIntercept = axios.interceptors.response.use(
			response => response,
			async (error) => {
				const prevReq = error?.config
				if (error?.response?.status === 403 && !prevReq?.sent){
					prevReq.sent = true
					const accessToken = await refresh()
					prevReq.headers['Authorization'] = `Bearer ${accessToken}`
					return axios(prevReq)
				}
				return Promise.reject(error)
			}
		)
		return () => {
			axios.interceptors.response.eject(resIntercept)
			axios.interceptors.request.eject(reqIntercept)
		}
	}, [auth, refresh])

	return axios
}

export default useAxios
