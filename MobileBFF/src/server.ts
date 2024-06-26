import * as http from 'http'
import app from './app'
import env from './config/env'
import { logger } from '@common/middleware/logger/logger'

const server = http.createServer(app)
server.listen(env.BFFPORT, () => {
  logger.info(`Server running on port ${env.BFFPORT}.`)
})
