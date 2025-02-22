import { Request, Response } from 'express'

// Como o desafio não pediu persistência de dados, armazenar dados temporariamente
let users: { id: number; name: string }[] = []

// GET /users
export const getUsers = (req: Request, res: Response): void => {
	res.json(users)
}

// POST /users
export const createUser = (req: Request, res: Response): void => {
	const { name } = req.body
	if (!name) {
		console.log(res.status(400).json({ message: 'Nome é obrigatório' }))
	}
	const newUser = { id: users.length + 1, name }
	users.push(newUser)
	res.status(201).json(newUser)
}
