import mongoose from 'mongoose'
const { Schema } = mongoose

const RolePermissions = new Schema({
	role_id: {
		type: String,
		required: true
	},
	permission_id: {
		type: String,
		required: true
	}
}, { timestamps: true, versionKey: false })

export default mongoose.model('Role_Permissions', RolePermissions)
