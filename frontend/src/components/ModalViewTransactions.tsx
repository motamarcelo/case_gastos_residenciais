import { TransactionProps } from '@/types/Transaction'
import { UserProps } from '@/types/User'
import formatCurrency from '@/utils/formatCurrency'

interface BtnProps {
	BtnTitle: string
	user: UserProps
	transactions: TransactionProps[]
	// onTransactionAdded: () => void //Notificar o componente Pai
}

export default function ModalViewTransactions({
	BtnTitle,
	user,
	transactions
}: BtnProps) {
	return (
		<div>
			<button
				className="text-black"
				onClick={() =>
					(
						document.getElementById(
							`transacoes_${user.id}`
						) as HTMLDialogElement
					).showModal()
				}
			>
				{BtnTitle}
			</button>
			<dialog id={`transacoes_${user.id}`} className="p-4 rounded-xl">
				<div className="modal-box min-w-max">
					<h3 className="font-bold text-lg">
						Você está visualizando as transações de {user.name}
					</h3>
					<div className="flex flex-col gap-2 mt-4">
						{transactions?.map(transaction => (
							<div
								key={transaction.id}
								className="flex flex-row justify-between"
							>
								<p>{transaction.type}</p>
								<p>{transaction.description}</p>
								<p
									className={`${
										transaction.type === 'receita'
											? 'text-green-600'
											: 'text-red-600'
									}`}
								>
									{formatCurrency(transaction.value)}
								</p>
							</div>
						))}
					</div>

					<div className="modal-action">
						<form method="dialog" className="flex flex-row gap-4">
							<button className="py-2 px-4 bg-red-900 text-white rounded-xl hover:bg-red-600 delay-100">
								Sair
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}
