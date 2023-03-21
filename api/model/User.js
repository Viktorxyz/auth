import mongoose from 'mongoose';
const { Schema } = mongoose;

const User = new Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	number: {
		type: String,
		required: true
	},
	points: {
		type: Number,
		min: 0
	},
	refresh_tokens: {
		type: [String]
	}
}, { timestamps: true, versionKey: false });

export default mongoose.model('User', User);
