/**
 * Utility methods to convert customer for WebBFF.
 */

import { CustomerDto, CustomerWebBFFDto } from '@api/generated'

/**
 * Converts a customer dto to a customer web bff dto.
 * @param dto the customer dto to convert.
 * @returns the converted customer web bff dto.
 */
export const convertCustomer = (dto: CustomerDto): CustomerWebBFFDto => {
  return {
    id: dto.id,
    userId: dto.userId,
    name: dto.name,
    phone: dto.phone,
  }
}
