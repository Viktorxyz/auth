import mongoose from 'mongoose'
const { Schema } = mongoose

const Role = new Schema({
	name: {
		type: String,
		required: true
	}
}, { timestamps: true, versionKey: false })

export default mongoose.model('Role', Role)
