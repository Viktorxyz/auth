import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../hook/useAxios.js'

const Permission = () => {
	const axios = useAxios()
	const { id } = useParams()

	const [permission, setPermission] = useState(null)

	useEffect(() => {
		const getPermission = async () => {
			try {
				const permissionData = (await axios.get(`/permission/${id}`)).data
				setPermission(permissionData)
			} catch (error) {
				console.lg(error)
			}
		}
		getPermission()
	}, [])

	return (
		<>
			{permission &&
			 <section>
				 <h1>Permission</h1>
				 <p>Permission name: {permission.name}</p>
				 <p>Permission id: {permission._id}</p>
			 </section>
			}
		</>
	)
}

export default Permission
