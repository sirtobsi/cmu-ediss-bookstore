/**
 * Utility methods to convert book data DTOs to DAOs and vice versa.
 */

import { BookDto } from '@api/generated'
import { BookDao } from '@prisma/client'

/**
 * Converts a book DAO to a book DTO.
 * @param {BookDao} bookDao the book DAO to convert.
 * @returns {BookDto} the converted book DTO.
 */
export const convertBookDaoToDto = (bookDao: BookDao): BookDto => {
  return {
    ISBN: bookDao.ISBN,
    title: bookDao.title,
    Author: bookDao.Author,
    description: bookDao.description,
    genre: bookDao.genre,
    price: bookDao.price,
    quantity: bookDao.quantity,
  }
}

/**
 * Converts a book DTO to a book DAO.
 * @param {BookDto} bookDto the book DTO to convert.
 * @returns {BookDao} the converted book DAO.
 */
export const convertBookDtoToDao = (bookDto: BookDto): BookDao => {
    return {
        ISBN: bookDto.ISBN,
        title: bookDto.title,
        Author: bookDto.Author,
        description: bookDto.description,
        genre: bookDto.genre,
        price: bookDto.price,
        quantity: bookDto.quantity,
    }
}
