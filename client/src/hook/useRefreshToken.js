import useAuth from './useAuth.js'
import axios from '../axios.js'

const useRefreshToken = () => {
	const { setAuth } = useAuth()

	const refresh = async () => {
		const { data } = await axios.post('/auth/refresh')
		setAuth(() => {
			return { accessToken: data.accessToken }
		})
		return data.accessToken
	}
	return refresh
}
export default useRefreshToken
