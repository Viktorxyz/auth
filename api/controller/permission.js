import Permission from '../model/Permission.js'
import error from '../util/error.js'

export const createPermission = async (req, res, next) => {
	const name = req.body.name.toUpperCase().replace(/ /g,"_")
	try {
		if (await Permission.findOne({ name })) return next(error(409, 'Permission already exists'))
		const permission = new Permission({ name })
		const savedPermission = await permission.save()
		res.status(200).json(savedPermission)
	} catch (error) {
		return next(error)
	}
}
export const updatePermission = async (req, res, next) => {
	try {
		if (await Permission.findOne(req.body)) return next(error(409, 'Conflict'))
		const updatedPermission = await Permission.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
		res.status(200).json(updatedPermission)
	} catch (error) {
		return next(error)
	}
}
export const deletePermission = async (req, res, next) => {
	try {
		await Permission.findByIdAndDelete(req.params.id)
		res.status(200).json('Permission has been deleted')
	} catch (error) {
		return next(error)
	}
}
export const getPermission = async (req, res, next) => {
	try {
		const permission = await Permission.findById(req.params.id)
		res.status(200).json(permission)
	} catch (error) {
		return next(error)
	}
}
export const getPermissions = async (req, res, next) => {
	try {
		const ids = Object.values(req.query)
		const permissions = (ids.length > 0)
			? await Permission.find({ '_id': { $in: ids } })
			: await Permission.find()
		res.status(200).json(permissions)
	} catch (error) {
		return next(error)
	}
}
