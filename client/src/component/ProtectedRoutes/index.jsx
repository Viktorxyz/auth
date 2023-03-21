import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from '../../hook/useAuth.js'

const ProtectedRoutes = () => {
	const { auth } = useAuth()
	const location = useLocation()
	return (
		<>
			{auth.accessToken
				? <Outlet />
				: <Navigate to='/login' state={{ location }} replace />
			}
		</>
	)
}

export default ProtectedRoutes
