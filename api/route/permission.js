import express from 'express';

import { createPermission, deletePermission, updatePermission, getPermission, getPermissions } from '../controller/permission.js';

const router = express.Router();

// CREATE
router.post('', createPermission);
// UPDATE
router.put('/:id', updatePermission);
// DELETE
router.delete('/:id', deletePermission);
// GET
router.get('/:ids', getPermission);
// GET ALL
router.get('/', getPermissions);

export default router;
