import { Router } from 'express'
import {
	getAllTransactions,
	getTransactionByID,
	createTransaction
} from '../controllers/transactionsController'

const router = Router()

router.get('/', getAllTransactions)

router.get('/:id', getTransactionByID)

router.post('/', createTransaction)

export default router
