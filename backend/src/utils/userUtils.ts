import { users, userProps } from '../controllers/userController'

// Função Auxiliar para buscar um usuário da "Base de Dados"
export const findUserById = (id: number) => {
	return users.find((user: userProps) => user.id === id)
}
