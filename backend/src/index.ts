import express, { Request, Response } from 'express'
import userRoutes from './routes/userRoutes'
import cors from 'cors'
import transactionsRoutes from './routes/transactionsRoutes'

const app = express()
const port = 3001

// Middleware para parsear o  JSON
app.use(express.json())

// Middleware para habilitar CORS
app.use(cors())

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
