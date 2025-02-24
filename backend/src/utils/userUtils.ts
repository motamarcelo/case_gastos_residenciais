import { users, userProps } from '../controllers/userController'

export const findUserById = (id: number) => {
	return users.find((user: userProps) => user.id === id)
}
