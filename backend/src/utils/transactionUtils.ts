import {
	transactions,
	transactionProps
} from '../controllers/transactionsController'

// Função auxiliar para retornar todas as transações de um usuário
export const getUserTransactions = (personId: number): transactionProps[] => {
	return transactions.filter(
		(transaction: transactionProps) => transaction.personId === personId
	)
}

// Função auxiliar para retornar despesas de um user
export const getDespesasById = (personId: number): number => {
	let total: number = 0
	transactions.forEach((transaction: transactionProps) => {
		if (
			transaction.personId === personId &&
			transaction.type === 'despesa'
		) {
			total += transaction.value
		}
	})
	return total
}

// Função auxiliar para retornar receitas de um user
export const getReceitasById = (personId: number): number => {
	let total: number = 0
	transactions.forEach((transaction: transactionProps) => {
		if (
			transaction.personId === personId &&
			transaction.type === 'receita'
		) {
			total += transaction.value
		}
	})
	return total
}

// Função auxiliar para remover transações por personId
export const removeTransactionsByPersonId = (personId: number): void => {
	for (let i = transactions.length - 1; i >= 0; i--) {
		if (transactions[i].personId === personId) {
			transactions.splice(i, 1)
		}
	}
}
