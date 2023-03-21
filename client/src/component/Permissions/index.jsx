import { useEffect, useState } from "react"
import useAxios from '../../hook/useAxios.js'


const Permission = () => {
	const [permissions, setPermissions] = useState([])
	const axios = useAxios()

	const [message, setMessage] = useState(null)

	useEffect(() => {
		const getPermissions = async () => {
			try {
				const permissionsData = (await axios.get(`/permission`)).data
				setPermissions(permissionsData)
			} catch (error) {
				console.log(error)
				setPermissions([])
			}
		}
		getPermissions()
	}, [message])

	const Permissions = () => {
		return (
			<>
				<table>
					<thead>
						<tr>
							<th>PERMISSION</th>
							<th>ID</th>
						</tr>
					</thead>
					<tbody>
						{permissions.map((permission, i) => {
							return (
								<tr key={i}>
									<td>{permission.name}</td>
									<td>{permission._id}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</>
		)
	}

	const createPermission = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const submission = { name: formData.get('name') }
		try {
			const res = (await axios.post('/permission', submission)).data
			setMessage(`Successfully added ${res.name} PERMISSION with ${res._id} ID`)
		} catch (error) {
			setMessage(error.response.data)
		}
	}

	const CreateForm = () => {
		return (
			<>
				<form onSubmit={createPermission}>
					<input name="name" type="text" placeholder='Type name here' />
					<button type='submit'>Add new permission</button>
				</form>
			</>
		)
	}

	const deletePermission = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const id = formData.get('id')
		try {
			const res = (await axios.delete(`/permission/${id}`)).data
			setMessage(res)
		} catch (error) {
			setMessage(error.response.data)
		}
	}

	const DeleteForm = () => {
		return (
			<>
				<form onSubmit={deletePermission}>
					<input name="id" type="text" placeholder='Type ID here' />
					<button type='submit'>Delete permission</button>
				</form>
			</>
		)
	}

	return (
		<>
			<Permissions />
			<CreateForm />
			<DeleteForm />
			{message && <h3>{message}</h3>}
		</>
	)
}

export default Permission
