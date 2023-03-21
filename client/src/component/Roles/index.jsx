import { useEffect, useState } from "react"
import useAxios from '../../hook/useAxios.js'


const Role = () => {
	const [roles, setRoles] = useState([])
	const axios = useAxios()

	const [message, setMessage] = useState(null)

	useEffect(() => {
		const getRoles = async () => {
			try {
				const rolesData = (await axios.get('/role')).data
				for (let i = 0; i < rolesData.length; i++) {
					try {
						const permissions = (await axios.get(`/role/${rolesData[i]._id}/permission`)).data
						const ids = permissions.map(r => r.permission_id)
						if (ids.length > 0) rolesData[i].permissions = (await axios.get(`/permission`, { params: ids })).data
						else rolesData[i].permissions = ['Role does not have PERMISSIONS']
					} catch (error) {
						rolesData[i].permissions = [error.response.data]
					}
				}
				setRoles(rolesData)
			} catch (error) {
				setRoles([])
			}
		}
		getRoles()
	}, [message])

	const Roles = () => {
		const copyToClipBoard = (id) => {
			navigator.clipboard.writeText(id)
			setMessage('ID copied to clipboard')
		}
		return (
			<>
				<table>
					<thead>
						<tr>
							<th>ROLE</th>
							<th>ID</th>
							<th>ROLE PERMISSIONS</th>
						</tr>
					</thead>
					<tbody>
						{roles.map((role, i) => {
							return (
								<tr key={i}>
									<td>{role.name}</td>
									<td onClick={(() => copyToClipBoard(role._id))}>{role._id}</td>
									<td>{role.permissions.map((permission, i)=> {
										return <p key={i} onClick={() => copyToClipBoard(permission._id)}>{permission.name || permission}</p>
									})}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</>
		)
	}

	const createRole = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const submission = { name: formData.get('name') }
		try {
			const res = (await axios.post('/role', submission)).data
			setMessage(`Successfully added ${res.name} ROLE with ${res._id} ID`)
		} catch (error) {
			setMessage(error.response.data)
		}
	}

	const CreateForm = () => {
		return (
			<>
				<form onSubmit={createRole}>
					<input name="name" type="text" placeholder='Type name here' />
					<button type='submit'>Add new role</button>
				</form>
			</>
		)
	}

	const deleteRole = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const id = formData.get('id')
		try {
			const res = (await axios.delete(`/role/${id}`)).data
			setMessage(res)
		} catch (error) {
			setMessage(error.response.data)
		}
	}

	const attachPermission = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const role_id = formData.get('role_id')
		const permission_id = formData.get('permission_id')
		try {
			const res = (await axios.post(`/role/${role_id}/permission/${permission_id}`)).data
			setMessage(res)
		} catch (error) {
			setMessage(error.response.data)
		}
	}

	const AttachForm = () => {
		return (
			<>
				<form onSubmit={attachPermission}>
					<input name="role_id" type="text" placeholder='Type ROLE ID here' />
					<input name="permission_id" type="text" placeholder='Type PERMISSION ID here' />
					<button type='submit'>Attach</button>
				</form>
			</>
		)
	}

	const DeleteForm = () => {
		return (
			<>
				<form onSubmit={deleteRole}>
					<input name="id" type="text" placeholder='Type ID here' />
					<button type='submit'>Delete role</button>
				</form>
			</>
		)
	}

	return (
		<>
			<Roles />
			<CreateForm />
			<DeleteForm />
			<AttachForm />
			{message && <h3>{message}</h3>}
		</>
	)
}

export default Role
