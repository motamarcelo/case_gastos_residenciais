import { Request, Response } from 'express'
import { findUserById } from '../utils/userUtils'

// Armazenar dados temporariamente:
let transactions: {
	id: number
	description: string
	value: number
	type: 'receita' | 'despesa'
	personId: number
}[] = []
// Contador para os ids
let nextID = 1

// GET /transactions
export const getAllTransactions = (req: Request, res: Response): void => {
	res.json(transactions)
	return
}

// GET /transactions/:id
export const getTransactionByID = (req: Request, res: Response): void => {
	const { id } = req.params
	const transaction = transactions.find(
		transaction => transaction.id === Number(id)
	)
	if (transaction) {
		res.json(transaction)
		return
	} else {
		res.status(404).json({ message: 'Transação não encontrada' })
		return
	}
}

// POST /transactions
export const createTransaction = (req: Request, res: Response): void => {
	const { description, value, type, personId } = req.body

	if (!description || !value || !type || !personId) {
		res.status(400).json({
			message: 'Campos obrigatórios se encontram vazios'
		})
		return
	}

	const user = findUserById(personId)
	if (!user) {
		res.status(400).json({ message: 'Usuário não encontrado' })
		return
	}

	// lógica de idade aqui, age <= 18 apenas despesas
	if (user.age < 18 && type !== 'despesa') {
		res.status(400).json({
			message: 'Usuários com menos de 18 anos não podem ter receitas'
		})
		return
	}

	if (type !== 'receita' && type !== 'despesa') {
		res.status(400).json({
			message: "O campo type apenas aceita valores 'receita' ou 'despesa'"
		})
		return
	}

	const newTransaction = { id: nextID++, description, value, type, personId }
	transactions.push(newTransaction)
	res.status(201).json(newTransaction)
}
