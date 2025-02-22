import { Router } from 'express'
import { getUsers, createUser } from '../controllers/userController'

const router = Router()

//GET /users
router.get('/', getUsers)

//POST /users
router.post('/', createUser)

export default router
