import { CustomerDto } from '@api/generated'
import logger from '@common/middleware/logger/logger'
import { Kafka, EachMessagePayload, Consumer } from 'kafkajs'
import { sendEmail } from './emailService'

// Define the Kafka consumer configuration
const kafka = new Kafka({
  clientId: 'bookstore',
  brokers: ['52.72.198.36:9092', '54.224.217.168:9092', '44.208.221.62:9092'],
})

const consumer: Consumer = kafka.consumer({ groupId: 'bookstore-group' })
const topic = 'tschamel.customer.evt'

/**
 * Runs the Kafka consumer to listen for new customer events.
 */
export const runConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })

  logger.info('Consumer is running.')

  await consumer.run({
    eachMessage: async (payload: EachMessagePayload) => {
      if (!payload.message.value) {
        return
      }
      const customerDto: CustomerDto = JSON.parse(
        payload.message.value.toString(),
      )
      logger.info(`Received customerDto: ${customerDto.id}`)
      sendEmail(
        customerDto.userId,
        'Activate your book store account',
        `Dear ${customerDto.name},\nWelcome to the Book store created by tschamel.\nExceptionally this time we won’t ask you to click a link to activate your account.`,
      )
    },
  })
}