import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../hook/useAxios.js'

const User = () => {
	const { id } = useParams()
	const axios = useAxios()

	const [user, setUser] = useState(null)

	useEffect(() => {
		const getUser = async () => {
			try {
				const userData = (await axios.get(`/user/${id}`)).data
				const rolesData = (await axios.get(`/user/${id}/role`)).data
				const roles = []
				for (const { role_id } of rolesData) {
					const roleData = (await axios.get(`/role/${role_id}`)).data
					roles.push(roleData)
				}
				setUser({ ...userData, roles })
			} catch (error) {
				console.log(error)
			}
		}
		getUser()
	}, [])

	return (
		<>
			{user &&
			 <section>
				 <h1>User</h1>
				 <p>First name: {user.first_name}</p>
				 <p>Last name: {user.last_name}</p>
				 <p>Username: {user.username}</p>
				 <p>Email: {user.email}</p>
				 <p>Number: {user.number}</p>
				 <p>User id: {user._id}</p>
				 <p>User roles: {user.roles.map((role, i) => <span key={i}>{role.name} {role._id}</span>)}</p>
			 </section>
			}
		</>
	)
}

export default User
