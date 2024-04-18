/**
 * This is simply a script to test the kafka consumer by manually publshing a new customer to the event queue.
 */

import { CustomerDto } from '@api/generated'
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'bookstore',
  brokers: ['52.72.198.36:9092', '54.224.217.168:9092', '44.208.221.62:9092'],
})

/**
 * Publishes a new customer to Kafka message queue to be consumed by email service.
 * @param {CustomerDto} newCustomer the new customer to publish to Kafka
 * @returns
 */
const publishCustomerCreationToKafka = async (
  newCustomer: CustomerDto,
): Promise<void> => {
  const producer = kafka.producer()
  try {
    await producer.connect()
    await producer.send({
      topic: 'tschamel.customer.evt',
      messages: [{ value: JSON.stringify(newCustomer) }],
    })
  } catch (error) {
    console.error(
      `Failed to publish customer creation event to Kafka: ${error}`,
    )
  } finally {
    await producer.disconnect()
  }
}

publishCustomerCreationToKafka({
  id: 1,
  userId: 'edissbookstore@gmail.com',
  name: 'Sir Tobsi',
  address: '123 Main St',
  phone: '123-456-7890',
  city: 'Pittsburgh',
  state: 'PA',
  zipcode: '15206',
})
