import express from 'express'
import userRoles from '../route/userRoles.js'

import { deleteUser, updateUser, getUser, getUsers } from '../controller/user.js'

const router = express.Router()

// UPDATE
router.put('/:id', updateUser)
// DELETE
router.delete('/:id', deleteUser)
// GET
router.get('/:id', getUser)
// GET ALL
router.get('/', getUsers)

// USER ROLES
router.use('/:user_id/role', userRoles)

export default router
