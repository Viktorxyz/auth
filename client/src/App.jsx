import { Fragment } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Public from './component/Public'
import Login from './component/Login'
import Register from './component/Register'
import Users from './component/Users'
import User from './component/User'
import Roles from './component/Roles'
import Role from './component/Role'
import Permissions from './component/Permissions'
import Permission from './component/Permission'
import ProtectedRoutes from './component/ProtectedRoutes'
import PersistLogin from './component/PersistLogin'

import './App.css'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Fragment>
			<Route path='/' element={<Public />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route element={<PersistLogin />}>
				<Route element={<ProtectedRoutes />}>
					<Route path='/user' element={<Users />} />
					<Route path='/user/:id' element={<User />} />
					<Route path='/role' element={<Roles />} />
					<Route path='/role/:id' element={<Role />} />
					<Route path='/permission' element={<Permissions />} />
					<Route path='/permission/:id' element={<Permission />} />
				</Route>
			</Route>
		</Fragment>
	)
)

function App() {
	return (
		<RouterProvider router={router} />
	)
}

export default App
