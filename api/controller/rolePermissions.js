import RolePermissions from '../model/RolePermissions.js'
import error from '../util/error.js'

export const attachPermission = async (req, res, next) => {
	try {
		const check = await RolePermissions.findOne(req.params)
		if (check) return next(error(409, 'Permission already attacked to role'))
		const permission = new RolePermissions(req.params)
		await permission.save()
		res.status(200).json('Permission attached to role')
	} catch (error) {
		return next(error)
	}
}
export const detachPermission = async (req, res, next) => {
	try {
		await RolePermissions.findOneAndDelete(req.params)
		res.status(200).json('Permission detached from role')
	} catch (error) {
		return next(error)
	}
}
export const getRolePermission = async (req, res, next) => {
	try {
		const permission = await RolePermissions.findOne(req.params)
		res.status(200).json(permission)
	} catch (error) {
		return next(error)
	}
}
export const getRolePermissions = async (req, res, next) => {
	try {
		const permissions = await RolePermissions.find({ role_id: req.params.role_id }, 'permission_id createdAt updatedAt')
		res.status(200).json(permissions)
	} catch (error) {
		return next(error)
	}
}
