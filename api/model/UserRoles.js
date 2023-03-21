import mongoose from 'mongoose'
const { Schema } = mongoose

const UserRoles = new Schema({
	user_id: {
		type: String,
		required: true
	},
	role_id: {
		type: String,
		required: true
	}
}, { timestamps: true, versionKey: false })

export default mongoose.model('User_Roles', UserRoles)
