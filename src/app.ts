import express, { Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'
import errorHandler from './middleware/errorhandler/errorhandler'
import { requestLogger } from './middleware/logger/httplogger'
import bookRouter from './routes/bookRouter'
import customerRouter from './routes/customerRouter'
import { HelloWorldResponseDto } from '@api/generated'

const app = express()

const swaggerDocument = YAML.load('./api/src/api.yaml')
app.use('/api-spec', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(requestLogger)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ msg: 'Hello World!' } as HelloWorldResponseDto)
})

app.use('/books', [bookRouter()])

app.use('/customers', [customerRouter()])



app.use(errorHandler)

export default app
