import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
// ROUTES
import auth from './route/auth.js'
import user from './route/user.js'
import role from './route/role.js'
import permission from './route/permission.js'
// MIDDLEWARES
import errorHandler from './middleware/errorHandler.js'
import verifyToken from './middleware/verifyToken.js'

const app = express()
const PORT = 3000

dotenv.config()

app.use(cors({
	origin: 'http://localhost:3001',
	credentials: true,
	//	allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
}))

/* app.use((req, res, next) => {
* 	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
* 	res.header('Access-Control-Allow-Credentials', true);
* 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
* 	res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
* 	next();
* }); */

// app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', auth)
app.use(verifyToken)
app.use('/user', user)
app.use('/role', role)
app.use('/permission', permission)

app.use(errorHandler)

app.listen(PORT, () => {
	(() => {
		try {
			mongoose.connect(process.env.MONGO)
			console.log('Connected to mongoDB')
		} catch (error) {
			console.log(error)
		}
	})()
	console.log(`Listening on port ${PORT}`)
})
