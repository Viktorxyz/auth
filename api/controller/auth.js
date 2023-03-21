import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'
import Role from '../model/Role.js'
import UserRoles from '../model/UserRoles.js'
import error from '../util/error.js'

const maxAge = 1000 * 60 * 60 * 24

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body
		if (!username) return next(error(400, 'Username is required'))
		if (!password) return next(error(400, 'Password is required'))

		const user = await User.findOne({ username })
		if(!user) return next(error(401, 'Unauthorized'))

		const cookies = req.cookies

		bcrypt.compare(password, user.password, async (err, match) => {
			if (!match) return next(error(401, 'Wrong password'))

			const userRoles = (await UserRoles.find({ user_id: user._id }, 'role_id')).map(ur => ur.role_id)
			const roles = (await Role.find({ '_id': { $in: userRoles } }, 'name')).map(r => r.name)

			const accessToken = jwt.sign({ username, roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
			const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

			let refreshTokens = !cookies?.refresh_token ? user.refresh_tokens : (user.refresh_tokens).filter(rt => rt !== cookies.refresh_token)

			if(cookies?.refresh_token) {
				// HACKED REFRESH TOKEN
				if (await User.findOne({ refresh_tokens: cookies.refresh_token })) refreshTokens = []

				res.clearCookie('refresh_token', { httpOnly: true, maxAge })
			}

			user.refresh_tokens = [ ...refreshTokens, refreshToken ]
			await user.save()

			res.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge })
			res.status(200).json({accessToken})
		})
	} catch (error) {
		next(error)
	}
}
export const register = async (req, res, next) => {
	try {
		if (await User.findOne({ username: req.body.username })) return next(error(409, 'Username is taken'))
		if (await User.findOne({ email: req.body.email })) return next(error(409, 'Email is taken'))
		if (await User.findOne({ number: req.body.number })) return next(error(409, 'Number is taken'))

		bcrypt.hash(req.body.password, 10, async (err, hash) => {
			req.body.password = hash
			const user = new User(req.body)
			await user.save()
			res.status(200).send('User has been registered')
		})
	} catch (error) {
		next(error)
	}
}
export const refresh = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.refresh_token
		if (!refreshToken) return next(error(401, 'Unauthorized'))

		const user = await User.findOne({ refresh_tokens: refreshToken })

		if (!user) {
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
				if (err) return next(error(403, 'Forbidden'))
				// HACKED USER
				const user = await User.findOne({ username: decoded.username })
				user.refresh_tokens = []
				await user.save()
			})
			return next(error(403, 'Forbidden'))
		}
		const refreshTokens = user.refresh_tokens.filter(rt => rt !== refreshToken)

		const userRoles = (await UserRoles.find({ user_id: user._id }, 'role_id')).map(ur => ur.role_id)
		const roles = (await Role.find({ '_id': { $in: userRoles } }, 'name')).map(r => r.name)

		const accessToken = jwt.sign({ username: user.username, roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' })
		const _refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

		user.refresh_tokens = [...refreshTokens, _refreshToken]
		await user.save()

		res.cookie('refresh_token', _refreshToken, { httpOnly: true, maxAge })
		res.status(200).json({ accessToken })
	} catch (error) {
		next(error)
	}
}
export const logout = async (req, res, next) => {
	try {
		const refreshToken = req?.cookies?.refresh_token

		if (!refreshToken) return next(error(204, 'No content'))

		const user = await User.findOne({ refreshToken })

		if(!user) {
			res.clearCookie('refresh_token', { httpOnly: true, maxAge})
			return next(error(204, 'No user found with that refreshToken'))
		}

		user.refresh_tokens = (user.refresh_tokens).filter(rt => rt !== refreshToken)
		await user.save()

		res.clearCookie('refresh_token', { httpOnly: true, maxAge})
		res.status(204).send('Logged Out')
	} catch (error) {
		next(error)
	}
}
