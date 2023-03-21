import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useRefreshToken from '../../hook/useRefreshToken.js'
import useAuth from '../../hook/useAuth.js'

const PersistLogin = () => {
	const [loading, setLoading] = useState(true)
	const refresh = useRefreshToken()
	const { auth } = useAuth()


	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh()
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		!auth?.accessToken ? verifyRefreshToken() : setLoading(false)
	}, [])
	return (
		<>
			{loading
				? <p>Loading...</p>
				: <Outlet />
			}
		</>
	)
}

export default PersistLogin
