import express from 'express'
import verifyPermissions from '../middleware/verifyPermissions.js'

import { attachPermission, detachPermission, getRolePermission, getRolePermissions } from '../controller/rolePermissions.js'

const router = express.Router({ mergeParams: true })

// ATTACH
router.post('/:permission_id', attachPermission)
// DETACH
router.delete('/:permission_id', detachPermission)
// GET
router.get('/:permission_id', getRolePermission)
// GET ALL
router.get('/', getRolePermissions)

export default router
