import { Request, Response } from 'express'
import { findUserById } from '../utils/userUtils'

export interface userProps {
	id: number
	name: string
	age: number
}

// Como o desafio não pediu persistência de dados, armazenar dados temporariamente:
export let users: userProps[] = []
// Contador para os ids
let nextID = 1

// GET /users
export const getAllUsers = (req: Request, res: Response): void => {
	res.json(users)
}

// GET /users/:id
export const getUserByID = (req: Request, res: Response): void => {
	const { id } = req.params
	const user = findUserById(Number(id))
	if (user) {
		res.json(user)
		return
	} else {
		res.status(404).json({ message: 'Usuário não encontrado' })
		return
	}
}

// POST /users
export const createUser = (req: Request, res: Response): void => {
	const { name, age } = req.body
	if (!name || !age) {
		if (!name) {
			res.status(400).json({ message: 'Nome é obrigatório' })
		} else {
			res.status(400).json({ message: 'Idade é obrigatória' })
		}
		return
	}
	const newUser = { id: nextID++, name, age }
	users.push(newUser)
	res.status(201).json(newUser)
}

// DELETE /users
export const deleteUser = (req: Request, res: Response): void => {
	const { id } = req.params
	const userIndex = users.findIndex(user => user.id === Number(id))
	if (userIndex !== -1) {
		users.splice(userIndex, 1)
		res.status(204).send()
		return
	} else {
		res.status(404).json({
			message: 'Usuário não encontrado'
		})
		return
	}
}
