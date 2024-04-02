/**
 * Utility methods to convert book for MobileBFF.
 */

import { BookDto, BookMobileBFFDto } from '@api/generated'

/**
 * Converts a book dto to a book mobile bff dto.
 * @param dto the book dto to convert.
 * @returns the converted book mobile bff dto.
 */
export const convertBook = (dto: BookDto): BookMobileBFFDto => {
  return {
    ISBN: dto.ISBN,
    title: dto.title,
    Author: dto.Author,
    description: dto.description,
    genre: dto.genre === 'non-fiction' ? 3 : dto.genre,
    price: dto.price,
    quantity: dto.quantity,
  }
}
