/**
 * The customer service provides methods to create, retrieve and update customers.
 */

import { CustomerDto, NewCustomerDto } from '@api/generated'
import { CustomerDao } from '@prisma/client'
import {
  validateCustomerDto,
  validateNewCustomerDto,
} from './validators/customerValidatorService'
import {
  convertCustomerDaoToDto,
  convertCustomerDtoToDao,
  convertNewCustomerDtoToDao,
} from './converters/customerConverterService'
import { ApiError, ApiErrorCodes } from '@common/middleware/errorhandler/APIError'
import { prisma } from '@customerservice/server'
import { Kafka } from 'kafkajs'
import logger from '@common/middleware/logger/logger'

/**
 * Creates a new customer.
 * @param {NewCustomerDto} newCustomer the customer to add.
 * @returns {CustomerDao} the newly added customer.
 */
export const createCustomer = async (
  newCustomer: NewCustomerDto,
): Promise<CustomerDao> => {
  const newCustomerDao: CustomerDao =
    convertNewCustomerDtoToDao(newCustomer)
  try {
    const createdCustomer: CustomerDao = await prisma.customerDao.create({
      data: {
        userId: newCustomer.userId,
        name: newCustomer.name,
        phone: newCustomer.phone,
        address: newCustomer.address,
        address2: newCustomer.address2,
        city: newCustomer.city,
        state: newCustomer.state,
        zipcode: newCustomer.zipcode,
      },
    })
    await publishCustomerCreationToKafka(convertCustomerDaoToDto(createdCustomer))
    return createdCustomer
  } catch (error) {
    throw new ApiError(
      ApiErrorCodes.BUSINESS_LOGIC_ERROR,
      `This user ID already exists in the system.`,
    )
  }
}

/**
 * Retrieves a customer by its id.
 * @param {number} id the id of the customer to retrieve.
 * @returns {CustomerDao} the retrieved customer.
 * @throws {ApiError} if the customer is not found.
 */
export const findCustomerById = async (id: number): Promise<CustomerDao> => {
  const retrievedCustomer: CustomerDao | null =
    await prisma.customerDao.findUnique({
      where: { id },
    })
  if (!retrievedCustomer) {
    throw new ApiError(
      ApiErrorCodes.NOT_FOUND,
      `Customer with id ${id} not found`,
    )
  }
  return retrievedCustomer
}

/**
 * Updates a customer by its id.
 * @param {number} id the id of the customer to update.
 * @param {CustomerDto} updatedCustomer the updated customer data.
 * @returns {CustomerDao} the updated customer.
 * @throws {ApiError} if the customer is not found.
 */
export const updateCustomerById = async (
  id: number,
  updatedCustomer: CustomerDto,
): Promise<CustomerDao> => {
  await findCustomerById(id)
  const validatedCustomer: CustomerDto = validateCustomerDto(updatedCustomer)
  const updatedCustomerDao: CustomerDao =
    convertCustomerDtoToDao(validatedCustomer)
  try {
    const updatedCustomer: CustomerDao = await prisma.customerDao.update({
      where: { id },
      data: updatedCustomerDao,
    })
    return updatedCustomer
  } catch (error) {
    throw new ApiError(
      ApiErrorCodes.BUSINESS_LOGIC_ERROR,
      `This user ID already exists in the system.`,
    )
  }
}

/**
 * Retrieves a customer by its userId.
 * @param {string} userId the userId of the customer to retrieve.
 * @returns {CustomerDao} the retrieved customer.
 * @throws {ApiError} if the customer is not found.
 */
export const findCustomerByUserId = async (
  userId: string,
): Promise<CustomerDao> => {
  const retrievedCustomer: CustomerDao | null =
    await prisma.customerDao.findUnique({
      where: { userId },
    })
  if (!retrievedCustomer) {
    throw new ApiError(
      ApiErrorCodes.NOT_FOUND,
      `Customer with userId ${userId} not found`,
    )
  }
  return retrievedCustomer
}

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
      messages: [
        { value: JSON.stringify(newCustomer) }
      ],
    })
  } catch (error) {
    logger.error(`Failed to publish customer creation event to Kafka: ${error}`)
  } finally {
    await producer.disconnect()
  }
}