import * as http from 'http'
import app from './app'
import env from './config/env'
import { logger } from '@common/middleware/logger/logger'
import { PrismaClient } from '@prisma/client'
import { runConsumer } from './services/consumer'
import './services/consumer'

export const prisma = new PrismaClient()


runConsumer().catch(error => {
  logger.error('Error running Kafka consumer:', error)
})

const server = http.createServer(app)
server.listen(env.SERVICEPORT, () => {
  logger.info(`Server running on port ${env.SERVICEPORT}.`)
})


