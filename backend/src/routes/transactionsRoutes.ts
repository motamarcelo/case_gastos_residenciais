import { Router } from 'express'
import {
	getAllTransactions,
	getTransactionByID,
	createTransaction,
	getAllUserTransactions,
	checkUserBalance,
	getTotalBalance
} from '../controllers/transactionsController'

const router = Router()

router.get('/', getAllTransactions)

router.get('/user/:id', getAllUserTransactions)

router.get('/user/balance/total', getTotalBalance)

router.get('/user/balance/:id', checkUserBalance)

router.get('/:id', getTransactionByID)

router.post('/', createTransaction)

export default router
