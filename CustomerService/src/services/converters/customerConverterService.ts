/**
 * Utility methods to convert customer & new customer data DTOs to DAOs and vice versa.
 */

import { CustomerDto, NewCustomerDto } from '@api/generated'
import { CustomerDao } from '@prisma/client'

/**
 * Converts a new customer DTO to a customer DAO.
 * @param {NewCustomerDto} newCustomerDto the new customer DTO to convert.
 * @returns {CustomerDao} the converted customer DAO.
 */
export const convertNewCustomerDtoToDao = (
  newCustomerDto: NewCustomerDto,
): CustomerDao => {
  return {
    id: 0, // Add the 'id' property with a default value
    userId: newCustomerDto.userId,
    name: newCustomerDto.name,
    phone: newCustomerDto.phone,
    address: newCustomerDto.address,
    address2: newCustomerDto.address2 || null,
    city: newCustomerDto.city,
    state: newCustomerDto.state,
    zipcode: newCustomerDto.zipcode,
  }
}

/**
 * Converts a customer DAO to a customer DTO.
 * @param {CustomerDao} customerDao the customer DAO to convert.
 * @returns {CustomerDto} the converted customer DTO.
 */
export const convertCustomerDaoToDto = (
  customerDao: CustomerDao,
): CustomerDto => {
  return {
    id: customerDao.id,
    userId: customerDao.userId,
    name: customerDao.name,
    phone: customerDao.phone,
    address: customerDao.address,
    address2: customerDao.address2 || undefined,
    city: customerDao.city,
    state: customerDao.state,
    zipcode: customerDao.zipcode,
  }
}

/**
 * Converts a customer DTO to a customer DAO.
 * @param {CustomerDto} customerDto the customer DTO to convert.
 * @returns {CustomerDao} the converted customer DAO.
 */
export const convertCustomerDtoToDao = (
  customerDto: CustomerDto,
): CustomerDao => {
  return {
    id: customerDto.id,
    userId: customerDto.userId,
    name: customerDto.name,
    phone: customerDto.phone,
    address: customerDto.address,
    address2: customerDto.address2 || null,
    city: customerDto.city,
    state: customerDto.state,
    zipcode: customerDto.zipcode,
  }
}
