import { Request, Response } from 'express'
import { findUserById } from '../utils/userUtils'
import {
	getUserTransactions,
	getDespesasById,
	getReceitasById
} from '../utils/transactionUtils'

export interface transactionProps {
	id: number
	description: string
	value: number
	type: 'receita' | 'despesa'
	personId: number
}

export interface UserBalance {
	userId: number
	totalDespesa: number
	totalReceita: number
	UserBalance: number
}

// Armazenar dados temporariamente:
export let transactions: transactionProps[] = []
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

// GET /transactions/user/:id
export const getAllUserTransactions = (req: Request, res: Response): void => {
	const userId = parseInt(req.params.id, 10)
	const transactions = getUserTransactions(userId)

	if (isNaN(userId)) {
		res.status(400).json({ error: 'user ID inválido' })
		return
	}

	if (transactions.length < 1) {
		res.status(404).json({ message: 'Esse usuário não possui transações' })
		return
	} else {
		res.status(201).json(transactions)
	}
}

// GET /transactions/user/balance
export const getTotalBalance = (req: Request, res: Response): void => {
	let totalReceita = 0
	let totalDespesa = 0

	transactions.forEach(transaction => {
		if (transaction.type === 'receita') {
			totalReceita += transaction.value
		} else if (transaction.type === 'despesa') {
			totalDespesa += transaction.value
		}
	})

	const calculatedBalance = totalReceita - totalDespesa

	const bal: UserBalance = {
		userId: 0, // Se você quiser um ID específico, ajuste aqui
		totalDespesa: totalDespesa,
		totalReceita: totalReceita,
		UserBalance: calculatedBalance
	}
	res.status(200).json(bal)
}

// GET /transactions/user/balance/:id
export const checkUserBalance = (req: Request, res: Response): void => {
	const userId = parseInt(req.params.id, 10)
	const bal: UserBalance = {
		userId: userId,
		totalDespesa: getDespesasById(userId),
		totalReceita: getReceitasById(userId),
		UserBalance: getReceitasById(userId) - getDespesasById(userId)
	}
	res.status(200).json(bal)
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

	// Procura o usuário na "Base de dados"
	const user = findUserById(personId)

	// Se o usuário não for encontrado
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

	// Garante que o campo tipo só aceite os dois valores
	if (type !== 'receita' && type !== 'despesa') {
		res.status(400).json({
			message: "O campo type apenas aceita valores 'receita' ou 'despesa'"
		})
		return
	}

	// Monta e Salva nova transação
	const newTransaction = { id: nextID++, description, value, type, personId }
	transactions.push(newTransaction)
	res.status(201).json(newTransaction)
}
