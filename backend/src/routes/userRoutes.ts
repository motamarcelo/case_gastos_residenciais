import { Router } from 'express'
import {
	getAllUsers,
	createUser,
	deleteUser,
	getUserByID
} from '../controllers/userController'

const router = Router()

// GET /users
router.get('/', getAllUsers)

// GET /users/:id
router.get('/:id', getUserByID)

// POST /users
router.post('/', createUser)

// DELETE /users/:id
router.delete('/:id', deleteUser)

export default router
