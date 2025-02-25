import { TransactionProps } from '@/types/Transaction'
import { UserProps } from '@/types/User'
import TransactionService from '@/utils/services/transaction'
import { useState } from 'react'

interface BtnProps {
	BtnTitle: string
	users: UserProps[]
	onTransactionAdded: () => void //Notificar o componente Pai
}

export default function ModalAddTransaction({
	BtnTitle,
	users,
	onTransactionAdded
}: BtnProps) {
	const [transactionDescription, setTransactionDescription] =
		useState<string>('')
	const [transactionValue, setTransactionValue] = useState<number>(0)
	const [transactionType, setTransactionType] = useState<
		'receita' | 'despesa'
	>('receita')
	const [userId, setUserId] = useState<number>(-1)
	const [userSelected, setUserSelected] = useState<UserProps>()

	const handleNewTransaction = (user: UserProps) => {
		const transaction: TransactionProps = {
			description: transactionDescription,
			value: transactionValue,
			type: transactionType,
			personId: userId
		}

		if (user.age < 18 && transactionType === 'receita') {
			return alert('usuários com menos de 18 anos não podem ter receitas')
		}

		const createTransaction = async () => {
			const response = await TransactionService.createNewTransaction(
				transaction
			)
			if (response) {
				console.log('Usuário criado com sucesso')
				onTransactionAdded()
				clearInputs()
				return
			}
			onTransactionAdded()
			clearInputs()
		}

		createTransaction()
	}

	const clearInputs = () => {
		setTransactionDescription('')
		setTransactionValue(0)
		setTransactionType('receita')
		setUserId(-1)
		setUserSelected(undefined)
	}

	const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedUserId = Number(e.target.value)
		const selectedUser = users.find(user => user.id === selectedUserId)
		setUserId(selectedUserId)
		setUserSelected(selectedUser)
	}

	return (
		<div>
			<button
				className="py-2 px-4 bg-gray-700 text-white rounded-xl"
				onClick={() =>
					(
						document.getElementById(
							'my_modal_2'
						) as HTMLDialogElement
					).showModal()
				}
			>
				{BtnTitle}
			</button>
			<dialog id="my_modal_2" className="p-4 rounded-xl">
				<div className="modal-box min-w-max">
					<h3 className="font-bold text-lg">
						Adicione uma nova transação
					</h3>
					<div className="flex flex-col mt-4 gap-2">
						<label htmlFor="">Quem está realizando?</label>
						<select
							value={userId}
							onChange={handleUserChange}
							className="p-2"
						>
							<option value={-1} disabled>
								Selecione um usuário
							</option>
							{users.map(user => (
								<option key={user.id} value={user.id}>
									{user.name}
								</option>
							))}
						</select>
					</div>
					<div className="flex flex-col mt-4 gap-2">
						<label htmlFor="">Descrição da Transação:</label>
						<input
							type="text"
							value={transactionDescription}
							onChange={e =>
								setTransactionDescription(e.target.value)
							}
							placeholder="Qual o motivo dessa transação?"
							className="p-2"
						/>
					</div>
					<div className="flex flex-col mt-4 gap-2">
						<label htmlFor="">Valor:</label>
						<input
							type="number"
							value={transactionValue}
							onChange={e =>
								setTransactionValue(Number(e.target.value))
							}
							placeholder="Quanto Custou essa transação?"
							className="p-2"
						/>
					</div>
					<div className="flex flex-col mt-4 gap-2">
						<label htmlFor="">Tipo da Transação:</label>
						<select
							value={transactionType}
							onChange={e =>
								setTransactionType(
									e.target.value as 'receita' | 'despesa'
								)
							}
							className="p-2"
						>
							<option value="receita">Receita</option>
							<option value="despesa">Despesa</option>
						</select>
					</div>
					<div className="modal-action">
						<form method="dialog" className="flex flex-row gap-4">
							<button className="py-2 px-4 bg-red-900 text-white rounded-xl hover:bg-red-600 delay-100">
								Cancelar
							</button>
							<button
								onClick={() =>
									userSelected &&
									handleNewTransaction(userSelected)
								}
								className="py-2 px-4 bg-slate-400 text-black font-semibold rounded-xl hover:bg-slate-600 delay-100"
							>
								Adicionar
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}
