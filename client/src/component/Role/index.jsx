import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../hook/useAxios.js'

const Role = () => {
	const axios = useAxios()
	const { id } = useParams()

	const [role, setRole] = useState(null)

	useEffect(() => {
		const getRole = async () => {
			try {
				const roleData = (await axios.get(`/role/${id}`)).data
				setRole(roleData)
			} catch (error) {
				console.lg(error)
			}
		}
		getRole()
	}, [])

	return (
		<>
			{role &&
			 <section>
				 <h1>Role</h1>
				 <p>Role name: {role.name}</p>
				 <p>Role id: {role._id}</p>
			 </section>
			}
		</>
	)
}

export default Role
