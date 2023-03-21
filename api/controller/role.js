import Role from '../model/Role.js'
import error from '../util/error.js'

export const createRole = async (req, res, next) => {
	const name = req.body.name.toUpperCase().replace(/ /g, "_")
	try {
		if (await Role.findOne({ name })) return next(error(409, 'Role already exists'))
		const role = new Role({ name })
		const savedRole = await role.save()
		res.status(200).json(savedRole)
	} catch (error) {
		next(error)
	}
}
export const updateRole = async (req, res, next) => {
	try {
		if(await Role.findOne(req.body)) return next(error(409, 'Conflict'))
		const updatedRole = await Role.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
		res.status(200).json(updatedRole)
	} catch (error) {
		next(error)
	}
}
export const deleteRole = async (req, res, next) => {
	try {
		await Role.findByIdAndDelete(req.params.id)
		res.status(200).json("Role has been deleted.")
	} catch (error) {
		next(error)
	}
}
export const getRole = async (req, res, next) => {
	try {
		const role = await Role.findById(req.params.id)
		res.status(200).json(role)
	} catch (error) {
		next(error)
	}
}
export const getRoles = async (req, res, next) => {
	try {
		const ids = Object.values(req.query)
		const roles = (ids.length > 0)
			? await Role.find({ '_id': { $in: ids } })
			: await Role.find()
		res.status(200).json(roles)
	} catch (error) {
		next(error)
	}
}
