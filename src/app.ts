import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/students/student.route'

const app: Application = express()


// Parser
app.use(express.json())
app.use(cors())


// application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
    const a = 100;
    res.send(a)
})


export default app;


