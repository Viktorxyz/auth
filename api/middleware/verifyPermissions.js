import error from '../util/error.js'
import RolePermissions from '../model/RolePermissions.js'
import Role from '../model/Role.js'
import Permission from '../model/Permission.js'

const verifyPermissions = (...reqPermissions) => {
	return async (req, res, next) => {
		if (!req?.roles) return next(401, 'No roles in request')

		if (req.roles.includes('ADMIN')) return next()

		for (const role of req.roles) {
			const role_id = (await Role.findOne({ name: role }))._id.toString()
			const rolePermissions = (await RolePermissions.find({ role_id }, 'permission_id')).map(rp => rp.permission_id)
			const permissions = ((await Permission.find({}, 'name')).filter(p => rolePermissions.includes(p._id.toString()))).map(p => p.name)
			const check = (permissions.length >= reqPermissions.length) && (reqPermissions.every(reqPermission => permissions.includes(reqPermission)))
			if (check) return next()
		}
		return next(error(401, 'No required permissions'))
	}
}
export default verifyPermissions
