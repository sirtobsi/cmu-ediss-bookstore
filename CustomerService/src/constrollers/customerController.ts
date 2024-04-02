/**
 * Customer controller handling the customer routes.
 */

import { CustomerDto, NewCustomerDto } from '@api/generated'
import { convertCustomerDaoToDto } from '@customerservice/services/converters/customerConverterService'
import { createCustomer, findCustomerById, findCustomerByUserId } from '@customerservice/services/customerService'
import { validateCustomerId, validateNewCustomerDto, validateUserId } from '@customerservice/services/validators/customerValidatorService'
import { CustomerDao } from '@prisma/client'
import { Request, Response } from 'express'
/**
 * Add a new customer.
 * @param {Request<any, any, NewCustomerDto>} req the incoming request including the customer to add.
 * @param {Response<CustomerDto>} res the outgoing response including the newly added customer.
 */
export const postCustomers = async (
  req: Request<any, any, NewCustomerDto>,
  res: Response<CustomerDto>,
) => {
  const newCustomer: NewCustomerDto = validateNewCustomerDto(req.body)

  const newCustomerDao: CustomerDao = await createCustomer(newCustomer)
  const customerDto = convertCustomerDaoToDto(newCustomerDao)

  res.status(201).json(customerDto)
}

/**
 * Get a customer by its id.
 * @param {Request<{ id: string }>} req the incoming request with the customer's id.
 * @param {Response<CustomerDto>} res the outgoing response including the retrieved customer.
 */
export const getCustomersById = async (
  req: Request<{ id: string }>,
  res: Response<CustomerDto>,
) => {
  const id = validateCustomerId(req.params.id)

  const retrievedCustomer: CustomerDao = await findCustomerById(Number(id))
  const customerDto: CustomerDto = convertCustomerDaoToDto(retrievedCustomer)

  res.status(200).json(customerDto)
}

/**
 * Get a customer by user id.
 * @param {Request<any, any, any, { userId: string }>} req the incoming request with the user id as query parameter.
 * @param {Response<CustomerDto>} res the outgoing response including the retrieved customer.
 */
export const getCustomers = async (
  req: Request<any, any, any, { userId: string }>,
  res: Response<CustomerDto>,
) => {
  const userId = validateUserId(req.query.userId)

  const customer: CustomerDao = await findCustomerByUserId(userId)
  const customerDto: CustomerDto = convertCustomerDaoToDto(customer)

  res.status(200).json(customerDto)
}
