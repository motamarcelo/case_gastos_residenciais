'use client'

import { useState, useEffect } from 'react'
import { UserProps } from '@/types/User'
import ModalAddUser from '@/components/ModalAddUser'
import ModalAddTransaction from '@/components/ModalAddTransaction'
import Table from '@/components/Table'
import UserService from '@/utils/services/user'
import TransactionService from '@/utils/services/transaction'
import { TransactionProps } from '@/types/Transaction'

export default function Home() {
	const [users, setUsers] = useState<UserProps[]>([])
	const [transactions, setTransactions] = useState<TransactionProps[]>([])

	const fetchUsers = async () => {
		const response = await UserService.getUsers()
		if (response) {
			const data: UserProps[] = response
			setUsers(data)
			return
		}
		setUsers([])
	}

	const fetchTransactions = async () => {
		const response = await TransactionService.getTransactions()
		if (response) {
			const data: TransactionProps[] = response
			setTransactions(data)
			return
		}
		setTransactions([])
	}

	useEffect(() => {
		fetchUsers()
		fetchTransactions()
	}, [])

	const handleUserAdded = () => {
		fetchUsers()
	}

	const handleTransactionAdded = () => {
		fetchTransactions()
	}

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<div className="flex flex-row gap-8">
					<ModalAddUser
						onUserAdded={handleUserAdded}
						BtnTitle="Adicionar Usuário"
					/>
					<ModalAddTransaction
						onTransactionAdded={handleTransactionAdded}
						users={users}
						BtnTitle="Adicionar Transação"
					/>
				</div>

				<Table
					onUserRemove={fetchUsers}
					users={users}
					transactions={transactions}
					onTransactionAdded={handleTransactionAdded}
				/>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<p>Feito por Marcelo Mota</p>
			</footer>
		</div>
	)
}
