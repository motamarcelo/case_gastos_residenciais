import { Request, Response } from 'express'
import { getUserAge } from './userController'

// Armazenar dados temporariamente:
let transactions: {
	id: number
	description: string
	value: number
	type: 'receitas' | 'despesas'
	personId: number
}[] = []
// Contador para os ids
let nextID = 1

// GET /transactions
export const getAllTransactions = (req: Request, res: Response): void => {
	res.json(transactions)
}

// GET /transactions/:id
export const getTransactionByID = (req: Request, res: Response): void => {
	const { id } = req.params
	const transaction = transactions.find(
		transaction => transaction.id === Number(id)
	)
	if (transaction) {
		res.json(transaction)
	} else {
		res.status(404).json({ message: 'Transação não encontrada' })
	}
}

// POST /transactions
export const createTransaction = (req: Request, res: Response): void => {
	const { description, value, type, personId } = req.body

	if (!description || !value || !type || !personId) {
		res.status(400).json({
			message: 'Campos obrigatórios se encontram vazios'
		})
	}

    const userAge = getUserAge(personId)
    if (!userAge) {
        
    }

	if (type !== 'receitas' && type !== 'despesas') {
		res.status(400).json({
			message:
				"O campo type apenas aceita respostas 'receitas' ou 'despesas'"
		})
	}

	const newTransaction = { id: nextID++, description, value, type, personId }
	transactions.push(newTransaction)
	res.status(201).json(newTransaction)
}
