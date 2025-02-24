import express, { Request, Response } from 'express'
import userRoutes from './routes/userRoutes'
import transactionsRoutes from './routes/transactionsRoutes'

const app = express()
const port = 3000

// Middleware para parsear o  JSON
app.use(express.json())

// Rotas
app.use('/users', userRoutes)
app.use('/transactions', transactionsRoutes)

// Rota de teste
app.get('/', (req: Request, res: Response) => {
	res.send('API está funcionando!')
})

// Inicia o Servidor
app.listen(port, () => {
	console.log(`Servidor rodando na porta: ${port}`)
})
