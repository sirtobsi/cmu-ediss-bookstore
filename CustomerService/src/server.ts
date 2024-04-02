import * as http from 'http'
import app from './app'
import env from './config/env'
import { logger } from '../../src/middleware/logger/logger'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

const server = http.createServer(app)
server.listen(env.SERVICEPORT, () => {
  logger.info(`Server running on port ${env.SERVICEPORT}.`)
})
