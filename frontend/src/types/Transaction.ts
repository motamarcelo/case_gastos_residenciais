// Criando a interface da Transação
export interface TransactionProps {
	id?: number
	description: string
	value: number
	type: 'receita' | 'despesa'
	personId: number
}