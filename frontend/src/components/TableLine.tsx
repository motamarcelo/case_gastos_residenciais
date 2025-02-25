import { TrashIcon } from '@heroicons/react/16/solid'
import UserService from '@/utils/services/user'
import TransactionService from '@/utils/services/transaction'
import { UserProps } from '@/types/User'
import { UserBalance } from '@/types/User'
import { useEffect, useState } from 'react'
import formatCurrency from '@/utils/formatCurrency'
import ModalViewTransactions from './ModalViewTransactions'

interface Props {
	user: UserProps
	onUserRemove: () => void // Avisar que um usuário foi removido
}

export default function TableLine({ user, onUserRemove }: Props) {
	const [userBalance, setUserBalance] = useState<UserBalance | null>()

	const handleRemoveUser = async () => {
		if (user.id !== undefined) {
			await UserService.removeUser(user.id)
			onUserRemove()
		}
	}

	useEffect(() => {
		const fetchBalance = async () => {
			if (user.id) {
				const response = await TransactionService.getUserBalance(
					user.id
				)
				if (response) {
					setUserBalance(response)
					return
				}
			}
		}

		fetchBalance()
	}, [user.id])

	return (
		<tr className="hover:bg-zinc-400">
			<th>{user.id}</th>
			<td>{user.name}</td>
			<td>{user.age}</td>
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
				<ModalViewTransactions BtnTitle="Transações" user={user} />
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
