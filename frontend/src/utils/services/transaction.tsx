import { TransactionProps } from '@/types/Transaction'
import { UserBalance } from '@/types/User'

import api from './api'

// Serviço para interagir com a api de Transactions.
class TransactionService {
	// Todas transações
	static async getTransactions(): Promise<TransactionProps[] | null> {
		try {
			const response = await api.get('/transactions')
			return response.data
		} catch (error) {
			console.log('Erro ao buscar transações', error)
			return null
		}
	}

	// Transações de um usuário(userId)
	static async getUserTransactions(
		id: number
	): Promise<TransactionProps[] | null> {
		try {
			const response = await api.get(`/transactions/user/${id}`)
			return response.data
		} catch (error) {
			console.log('Erro ao buscar transações do usuário', error)
			return null
		}
	}

	static async getUserBalance(id: number): Promise<UserBalance | null> {
		try {
			const response = await api.get(`/transactions/user/balance/${id}`)
			return response.data
		} catch (error) {
			console.log('Erro ao buscar o balanço do usuário', error)
			return null
		}
	}

	static async getTotalBalance(): Promise<UserBalance | null> {
		try {
			const response = await api.get('/transactions/user/balance/total')
			return response.data
		} catch (error) {
			console.log('Erro ao buscar o balanço total', error)
			return null
		}
	}

	static async createNewTransaction(
		transaction: TransactionProps
	): Promise<TransactionProps | null> {
		try {
			const response = await api.post('/transactions', transaction)
			return response.data
		} catch (error) {
			console.log('Erro ao tentar criar nova transação', error)
			return null
		}
	}
}

export default TransactionService
