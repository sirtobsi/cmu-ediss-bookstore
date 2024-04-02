import express, { Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'
import errorHandler from '@common/middleware/errorhandler/errorhandler'
import { requestLogger } from '@common/middleware/logger/httplogger'
import bookRouter from './routes/bookRouter'
import customerRouter from './routes/customerRouter'
import { HelloWorldResponseDto } from '@api/generated'
import { authHandler } from '@common/middleware/auth/authhandler'

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

app.use('/', [authHandler, bookRouter()])

app.use('/', [authHandler, customerRouter()])

app.use(errorHandler)

export default app
