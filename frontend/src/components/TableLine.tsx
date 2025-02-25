import { TrashIcon } from '@heroicons/react/16/solid'
import UserService from '@/utils/services/user'
import TransactionService from '@/utils/services/transaction'
import { UserBalance } from '@/types/User'
import { useEffect, useState } from 'react'
import formatCurrency from '@/utils/formatCurrency'

interface Props {
	user_id?: number
	name: string
	age: number
	onUserRemove: () => void // Avisar que um usuário foi removido
}

export default function TableLine({ user_id, name, age, onUserRemove }: Props) {
	const [userBalance, setUserBalance] = useState<UserBalance | null>()

	const handleRemoveUser = async () => {
		if (user_id !== undefined) {
			await UserService.removeUser(user_id)
			onUserRemove()
		}
	}

	const fetchBalance = async () => {
		if (user_id) {
			const response = await TransactionService.getUserBalance(user_id)
			if (response) {
				setUserBalance(response)
				return
			}
		}
	}

	useEffect(() => {
		fetchBalance()
	}, [fetchBalance])

	return (
		<tr className="hover:bg-zinc-400">
			<th>{user_id}</th>
			<td>{name}</td>
			<td>{age}</td>
			<td>
				{userBalance ? formatCurrency(userBalance.totalReceita) : ''}
			</td>
			<td>
				{userBalance ? formatCurrency(userBalance.totalDespesa) : ''}
			</td>
			<td>
				{userBalance ? formatCurrency(userBalance.UserBalance) : ''}
			</td>
			<td>
				<button>Transações</button>
			</td>
			<td>
				<button
					className="hover:scale-110 mt-2"
					onClick={handleRemoveUser}
				>
					<TrashIcon className="h-5 w-5 text-red-600" />
				</button>
			</td>
		</tr>
	)
}
