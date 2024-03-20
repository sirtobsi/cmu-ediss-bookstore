import { CustomerDto, NewCustomerDto } from '@api/generated'
import { ApiError, ApiErrorCodes } from 'src/middleware/errorhandler/APIError'
import { z } from 'zod'

/**
 * This is a zod schema for the newCustomer object used to validate the object.
 */
const newCustomerValidator = z.object({
  userId: z.string().email(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  state: z.string().refine(value => {
    const states = [
      'AL',
      'AK',
      'AZ',
      'AR',
      'CA',
      'CO',
      'CT',
      'DE',
      'FL',
      'GA',
      'HI',
      'ID',
      'IL',
      'IN',
      'IA',
      'KS',
      'KY',
      'LA',
      'ME',
      'MD',
      'MA',
      'MI',
      'MN',
      'MS',
      'MO',
      'MT',
      'NE',
      'NV',
      'NH',
      'NJ',
      'NM',
      'NY',
      'NC',
      'ND',
      'OH',
      'OK',
      'OR',
      'PA',
      'RI',
      'SC',
      'SD',
      'TN',
      'TX',
      'UT',
      'VT',
      'VA',
      'WA',
      'WV',
      'WI',
      'WY',
    ]
    return states.includes(value)
  }, 'Invalid state abbreviation'),
  zipcode: z.string(),
})

/**
 * This is a zod schema for the customer object used to validate the object.
 */
const customerValidator = newCustomerValidator.extend({
  id: z.number().int().positive(),
})

/**
 * This is a zod schema for the customer id used to validate the object.
 */
const customerIdValidator = z.number().int().positive()

/**
 * This ia a zod schema for the userId used to validate the object.
 */
const userIdValidator = z.string().email()

/**
 * Validates a new customer dto object.
 * @param {NewCustomerDto} customer the NewCustomerDto to validate
 * @returns {NewCustomerDto} the validated customer
 * @throws {ApiError} if the new customer is invalid
 */
export const validateNewCustomerDto = (
  customer: NewCustomerDto,
): NewCustomerDto => {
  try {
    return newCustomerValidator.parse(customer)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}

/**
 * Validates a customer dto object.
 * @param {CustomerDto} customer the customerDto to validate
 * @returns {CustomerDto} the validated customer
 * @throws {ApiError} if the customer is invalid
 */
export const validateCustomerDto = (customer: CustomerDto): CustomerDto => {
  try {
    return customerValidator.parse(customer)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}

/**
 * Validates a user id.
 * @param {number} id the id of the customer to validate
 * @returns {number} the validated customer id
 * @throws {ApiError} if the customer id is invalid
 */
export const validateCustomerId = (id: string): number => {
  try {
    return customerIdValidator.parse(Number(id))
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}

/**
 * Validates a user id.
 * @param {string} userId the userId of the customer to validate
 * @returns {string} the validated customer userId
 * @throws {ApiError} if the customer userId is invalid
 */
export const validateUserId = (userId: string): string => {
  try {
    return userIdValidator.parse(userId)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}
