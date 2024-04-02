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
  convertCustomerDtoToDao,
  convertNewCustomerDtoToDao,
} from './converters/customerConverterService'
import { ApiError, ApiErrorCodes } from 'src/middleware/errorhandler/APIError'
import { prisma } from 'src/server'

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
    return createdCustomer
  } catch (error) {
    // This is a clear antipattern as it allows for for checking which accounts exist in the system.
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
