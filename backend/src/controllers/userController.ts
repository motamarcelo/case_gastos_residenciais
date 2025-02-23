import { Request, Response } from 'express'

// Como o desafio não pediu persistência de dados, armazenar dados temporariamente:
let users: { id: number; name: string; age: number }[] = []

// GET /users
export const getAllUsers = (req: Request, res: Response): void => {
	const { id } = req.params
	id ? res.json(users[Number(id)]) : 
	res.json(users)
}

// GET /users/:id
export const getUserByID = (req: Request, res: Response): void => {
	const { id } = req.params
	const user = users.find(user => user.id === Number(id))
	if (user) {
		res.json(user)
	} else {
		res.status(404).json({ message: "Usuário não encontrado"})
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
	}
	const newUser = { id: users.length + 1, name, age }
	users.push(newUser)
	res.status(201).json(newUser)
}

// DELETE /users
export const deleteUser = (req: Request, res: Response): void => {
	const { id } = req.params
	const userIndex = users.findIndex(user => user.id === Number(id))
	if(userIndex !== -1) {
		users.splice(userIndex, 1)
		res.status(204).send()
	} else {
		res.status(404).json({
			message: 'Usuário não encontrado'
		})
	}
}
