import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAxios from '../../hook/useAxios.js'

const Register = () => {
	const navigate = useNavigate()
	const axios = useAxios()

	const [error, setError] = useState(false)

	const onSubmit = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const submission = {
			first_name: formData.get('first_name'),
			last_name: formData.get('last_name'),
			username: formData.get('username'),
			email: formData.get('email'),
			number: formData.get('number'),
			password: formData.get('password')
		}
		try {
			await axios.post('/auth/register', submission)
			navigate('/login')
		} catch (error) {
			setError(error.response.data)
		}
	}

	return (
		<>
			<form method='post' onSubmit={onSubmit}>
				<input name="first_name" type="text" placeholder='First name' />
				<input name="last_name" type="text" placeholder='Last name' />
				<input name="username" type="text" placeholder='Username' />
				<input name="email" type="email" placeholder='Email' />
				<input name="number" type="number" placeholder='Number' />
				<input name="password" type="password" placeholder='Password' />
				<input name="confirm_password" type="password" placeholder='Confirm password' />
				<button type='submit'>Register</button>
			</form>
			{error && (<p>{error}</p>)}
		</>
	)
}

export default Register
