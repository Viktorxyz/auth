import useAuth from '../../hook/useAuth.js'
import useAxios from '../../hook/useAxios.js'
import { useNavigate, useLocation } from 'react-router-dom'

const Login = () => {
	const { setAuth } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const axios = useAxios()
	const from = location.state?.from?.pathname || '/user'

	const onSubmit = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const submission = { username: formData.get('username'), password: formData.get('password') }
		try {
			const { data } = await axios.post('/auth/login', submission)
			setAuth(data)
			navigate(from, { replace: true })
		} catch (error) {
			console.log(error)
			navigate('/login', { replace: true, state: { from }})
		}
	}
	return (
		<>
			<form method='post' onSubmit={onSubmit}>
				<input name="username" type="text" placeholder='Username' />
				<input name="password" type="password" placeholder='Password' />
				<button type='submit'>Login</button>
			</form>
		</>
	)
}

export default Login
