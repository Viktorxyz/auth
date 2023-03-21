import express from 'express'

import { attachRole, detachRole, getUserRole, getUserRoles } from '../controller/userRoles.js'

const router = express.Router({ mergeParams: true })

// ATTACH
router.post('/:role_id', attachRole)
// DETACH
router.delete('/:role_id', detachRole)
// GET
router.get('/:role_id', getUserRole)
// GET ALL
router.get('/', getUserRoles)

export default router
