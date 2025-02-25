import { UserProps } from '@/types/User'
import UserService from '@/utils/services/user'
import { useState } from 'react'

interface BtnProps {
	BtnTitle: string
	onUserAdded: () => void //Notificar o componente Pai
}

export default function ModalAddUser({ BtnTitle, onUserAdded }: BtnProps) {
	const [userName, setUserName] = useState<string>('')
	const [userAge, setUserAge] = useState<number>(-1)

	const handleNewUser = () => {
		const user: UserProps = {
			name: userName,
			age: userAge
		}

		const createUser = async () => {
			const response = await UserService.addNewUser(user)
			if (response) {
				console.log('Usuário criado com sucesso')
				onUserAdded()
				setUserName('')
				setUserAge(0)
				return
			}
			setUserName('')
			setUserAge(0)
		}

		createUser()
	}

	return (
		<div>
			<button
				className="py-2 px-4 bg-gray-700 text-white rounded-xl"
				onClick={() =>
					(
						document.getElementById(
							'my_modal_1'
						) as HTMLDialogElement
					).showModal()
				}
			>
				{BtnTitle}
			</button>
			<dialog id="my_modal_1" className="p-4 rounded-xl">
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						Adicione um novo membro a família!
					</h3>
					<div className="flex flex-col mt-4 gap-2">
						<label htmlFor="">Nome do novo membro:</label>
						<input
							type="text"
							value={userName}
							onChange={e => setUserName(e.target.value)}
							placeholder="Nome aqui"
							className="p-2"
						/>
					</div>
					<div className="flex flex-col mt-4 gap-2">
						<label htmlFor="">Idade:</label>
						<input
							type="number"
							value={userAge >= 0 ? userAge : ''}
							onChange={e => setUserAge(Number(e.target.value))}
							placeholder="Idade Aqui"
							className="p-2"
						/>
					</div>
					<div className="modal-action">
						<form method="dialog" className="flex flex-row gap-4">
							<button className="py-2 px-4 bg-red-900 text-white rounded-xl hover:bg-red-600 delay-100">
								Cancelar
							</button>
							<button
								onClick={handleNewUser}
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
