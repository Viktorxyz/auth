import { useEffect, useState } from "react"
import useAxios from '../../hook/useAxios.js'


const User = () => {
	const [users, setUsers] = useState([])
	const axios = useAxios()

	const [message, setMessage] = useState(null)

	useEffect(() => {
		const getUsers = async () => {
			try {
				const usersData = (await axios.get('/user')).data
				for (let i = 0; i < usersData.length; i++) {
					try {
						const roles = (await axios.get(`/user/${usersData[i]._id}/role`)).data
						const ids = roles.map(r => r.role_id)
						if (ids.length > 0) usersData[i].roles = (await axios.get(`/role`, { params: ids })).data
						else usersData[i].roles = ['User does not have ROLES']
					} catch (error) {
						usersData[i].roles = [error.response.data]
					}
				}
				setUsers(usersData)
			} catch (error) {
				setUsers([])
			}
		}
		getUsers()
	}, [message])

	const Users = () => {
		const copyToClipBoard = (role_id) => {
			navigator.clipboard.writeText(role_id)
			setMessage('ID copied to clipboard')
		}
		return (
			<>
				<table>
					<thead>
						<tr>
							<th>FIRST NAME</th>
							<th>LAST NAME</th>
							<th>USERNAME</th>
							<th>NUMBER</th>
							<th>EMAIL</th>
							<th>ID</th>
							<th>USER ROLES</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, i) => {
							return (
								<tr key={i}>
									<td>{user.first_name}</td>
									<td>{user.last_name}</td>
									<td>{user.username}</td>
									<td>{user.number}</td>
									<td>{user.email}</td>
									<td onClick={() => copyToClipBoard(user._id)}>{user._id}</td>
									<td>{user.roles.map((role, i)=> {
										return <p key={i} onClick={() => copyToClipBoard(role._id)}>{role.name || role}</p>
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

	const deleteUser = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const id = formData.get('id')
		try {
			const res = (await axios.delete(`/user/${id}`)).data
			setMessage(res)
		} catch (error) {
			setMessage(error.response.data)
		}
	}

	const attachRole = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const user_id = formData.get('user_id')
		const role_id = formData.get('role_id')
		try {
			const res = (await axios.post(`/user/${user_id}/role/${role_id}`)).data
			setMessage(res)
		} catch (error) {
			setMessage(error.response.data)
		}
	}

	const AttachForm = () => {
		return (
			<>
				<form onSubmit={attachRole}>
					<input name="user_id" type="text" placeholder='Type USER ID here' />
					<input name="role_id" type="text" placeholder='Type ROLE ID here' />
					<button type='submit'>Attach</button>
				</form>
			</>
		)
	}

	const detachRole = async (e) => {
		e.preventDefault()
		const form = e.target
		const formData = new FormData(form)
		const user_id = formData.get('user_id')
		const role_id = formData.get('role_id')
		try {
			const res = (await axios.delete(`/user/${user_id}/role/${role_id}`)).data
			setMessage(res)
		} catch (error) {
			setMessage(error.response.data)
		}
	}

	const DetachForm = () => {
		return (
			<>
				<form onSubmit={detachRole}>
					<input name="user_id" type="text" placeholder='Type USER ID here' />
					<input name="role_id" type="text" placeholder='Type ROLE ID here' />
					<button type='submit'>Detach</button>
				</form>
			</>
		)
	}

	const DeleteForm = () => {
		return (
			<>
				<form onSubmit={deleteUser}>
					<input name="id" type="text" placeholder='Type ID here' />
					<button type='submit'>Delete user</button>
				</form>
			</>
		)
	}

	return (
		<>
			<Users />
			<DeleteForm />
			<AttachForm />
			<DetachForm />
			{message && <h3>{message}</h3>}
		</>
	)
}
export default User
