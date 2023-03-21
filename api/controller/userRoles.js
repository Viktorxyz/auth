import userRoles from '../model/UserRoles.js'
import error from '../util/error.js'

export const attachRole = async (req, res, next) => {
	try {
		const check = await userRoles.findOne(req.params)
		if (check) return next(error(409, 'Role already attached to user'))
		const role = new userRoles(req.params)
		await role.save()
		res.status(200).json('Role attached to user')
	} catch (error) {
		return next(error)
	}
}
export const detachRole = async (req, res, next) => {
	try {
		await userRoles.findOneAndDelete(req.params)
		res.status(200).json('Role detached from user')
	} catch (error) {
		return next(error)
	}
}
export const getUserRole = async (req, res, next) => {
	try {
		const role = await userRoles.findOne(req.params)
		res.status(200).json(role)
	} catch (error) {
		return next(error)
	}
}
export const getUserRoles = async (req, res, next) => {
	try {
		const roles = (await userRoles.find({ user_id: req.params.user_id }, 'role_id createdAt updatedAt'))
		res.status(200).json(roles)
	} catch (error) {
		return next(error)
	}
}
