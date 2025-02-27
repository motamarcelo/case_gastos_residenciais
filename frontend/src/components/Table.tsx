import { UserProps, UserBalance } from '@/types/User'
import TableLine from './TableLine'
import formatCurrency from '@/utils/formatCurrency'
import TransactionService from '@/utils/services/transaction'
import { useEffect, useState } from 'react'
import { TransactionProps } from '@/types/Transaction'

interface Props {
	users: UserProps[]
	transactions: TransactionProps[]
	onTransactionAdded: () => void // avisar que uma transação foi adicionada
	onUserRemove: () => void // avisar que usuário foi removido
}

export default function Table({
	users,
	transactions,
	onTransactionAdded,
	onUserRemove
}: Props) {
	const [totalBalance, setTotalBalance] = useState<UserBalance | null>()

	useEffect(() => {
		const fetchTotalBalance = async () => {
			const response = await TransactionService.getTotalBalance()
			if (response) {
				setTotalBalance(response)
				return
			}
		}

		fetchTotalBalance()
	}, [onTransactionAdded])

	return (
		<div className="overflow-x-auto bg-zinc-200 rounded-xl">
			<table className="table">
				{/* head */}
				<thead>
					<tr className="text-black text-xl">
						<th>ID</th>
						<th>Nome</th>
						<th>Idade</th>
						<th>Receitas</th>
						<th>Despesas</th>
						<th>Saldo</th>
					</tr>
				</thead>
				<tbody className="text-lg font-semibold">
					{users?.map(user => (
						<TableLine
							key={user.id}
							user={user}
							onTransactionAdded={onTransactionAdded}
							userTransactions={transactions.filter(
								transaction => transaction.personId === user.id
							)}
							onUserRemove={onUserRemove}
						/>
					))}
					{/* row 1 */}
					<tr className="justify-end">
						<td></td>
						<td></td>
						<td>Total:</td>
						<td>
							{totalBalance
								? formatCurrency(totalBalance.totalReceita)
								: ''}
						</td>
						<td>
							{totalBalance
								? formatCurrency(totalBalance.totalDespesa)
								: ''}
						</td>
						<td>
							{totalBalance
								? formatCurrency(totalBalance.UserBalance)
								: ''}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
