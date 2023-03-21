import mongoose from 'mongoose'
const { Schema } = mongoose

const Permission = new Schema({
	name: {
		type: String,
		required: true
	}
}, {
	timestamps: true,
	versionKey: false,
	statics: {
		findByName(name) {
			return this.find({ name: new RegExp(name, 'i') })
		}
	}
})

export default mongoose.model('Permission', Permission)
