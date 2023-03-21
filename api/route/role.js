import express from 'express'
import rolePermissions from '../route/rolePermissions.js'

import { createRole, deleteRole, updateRole, getRole, getRoles } from '../controller/role.js'

const router = express.Router()

// CREATE
router.post('/', createRole)
// UPDATE
router.put('/:id', updateRole)
// DELETE
router.delete('/:id', deleteRole)
// GET
router.get('/:id', getRole)
// GET ALL
router.get('/', getRoles)

// ROLE PERMISSIONS
router.use('/:role_id/permission', rolePermissions)

export default router
