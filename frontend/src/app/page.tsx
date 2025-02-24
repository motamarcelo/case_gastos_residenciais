'use client'

import { useState, useEffect } from 'react'
import { UserProps } from '@/types/User'
import Modal from '@/components/Modal'
import Table from '@/components/Table'
import api from '../services/api'

export default function Home() {
	const [users, setUsers] = useState<UserProps[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get<UserProps[]>('/users')
				setUsers(response.data)
			} catch (err) {
				console.log(err)
			}
		}

		fetchData()
	}, [])

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1>Olá</h1>
				<div className="flex flex-col">
					{users.map(user => (
						<div key={user.id} className="flex flex-row gap-8">
							<p>{user.id}</p>
							<p>{user.name}</p>
							<p>{user.age}</p>
						</div>
					))}
				</div>
				<Modal BtnTitle="Adicionar Usuário" />
				<Table />
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<p>Marcelo Mota</p>
			</footer>
		</div>
	)
}
