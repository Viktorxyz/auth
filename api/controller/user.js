import User from '../model/User.js'
import error from '../util/error.js'

export const updateUser = async (req, res, next) => {
	try {
		if (await User.findOne({ username: req.body.username })) return next(error(409, 'Username is taken'))
		if (await User.findOne({ email: req.body.email })) return next(error(409, 'Email is taken'))
		if (await User.findOne({ number: req.body.number })) return next(error(409, 'Number is taken'))
		const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
		res.status(200).json(user)
	} catch (error) {
		return next(error)
	}
}
export const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json('User has been deleted.')
	} catch (error) {
		return next(error)
	}
}
export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		res.status(200).json(user)
	} catch (error) {
		return next(error)
	}
}
export const getUsers = async (req, res, next) => {
	try {
		const ids = Object.values(req.query)
		const users = (ids.length > 0)
			? await User.find({ '_id': { $in: ids } })
			: await User.find()
		res.status(200).json(users)
	} catch (error) {
		return next(error)
	}
}
