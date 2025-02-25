import { UserProps } from '@/types/User'

import api from './api'

// Serviço para interagir com a API de users.
class UserService {
	static async getUsers(): Promise<UserProps[] | null> {
		try {
			const response = await api.get('/users')
			return response.data
		} catch (error) {
			console.log('Erro ao buscar usuários: ', error)
			return null
		}
	}

	static async addNewUser(user: UserProps): Promise<UserProps | null> {
		try {
			const response = await api.post('/users', user)
			return response.data
		} catch (error) {
			console.log('Erro ao adicionar usuário', error)
			return null
		}
	}

	static async removeUser(id: number): Promise<void> {
		try {
			await api.delete(`/users/${id}`)
		} catch (error) {
			console.log('Não foi possível remover usuário', error)
		}
	}
}

export default UserService
