/**
 * The book service provides methods to create, retrieve and update books.
 */

import { BookDto } from '@api/generated'
import { BookDao } from '@prisma/client'
import { convertBookDtoToDao } from './converters/bookConverterService'
import { ApiError, ApiErrorCodes } from '@common/middleware/errorhandler/APIError'
import { prisma } from 'src/server'

/**
 * Creates a new book after validating it.
 * @param {BookDto} book the book to add.
 * @returns {BookDao} the newly added book.
 * @throws {ApiError} if the book is invalid.
 */
export const createBook = async (book: BookDto): Promise<BookDao> => {
  const newBook: BookDao = convertBookDtoToDao(book)
  try {
    const createdBook: BookDao = await prisma.bookDao.create({ data: newBook })
    return createdBook
  } catch (error) {
    throw new ApiError(
      ApiErrorCodes.BUSINESS_LOGIC_ERROR,
      `This ISBN already exists in the system.`,
    )
  }
}

/**
 * Retrieves a book by its ISBN.
 * @param {string} ISBN the ISBN of the book to retrieve.
 * @returns {BookDao} the retrieved book.
 * @throws {ApiError} if the book is not found.
 */
export const findBookByISBN = async (ISBN: string): Promise<BookDao> => {
  const retrievedBook: BookDao | null = await prisma.bookDao.findUnique({
    where: { ISBN },
  })
  if (!retrievedBook) {
    throw new ApiError(
      ApiErrorCodes.NOT_FOUND,
      `Book with ISBN ${ISBN} not found`,
    )
  }
  return retrievedBook
}

/**
 * Updates a book by its ISBN after validating the update.
 * @param {string} ISBN the ISBN of the book to update.
 * @param {BookDto} updatedBook the updated book data.
 * @returns {BookDao} the updated book.
 * @throws {ApiError} if the book is not found or the book is invalid.
 */
export const updateBookByISBN = async (
  ISBN: string,
  updatedBook: BookDto,
): Promise<BookDao> => {
  await findBookByISBN(ISBN)
  const updatedDao: BookDao = convertBookDtoToDao(updatedBook)
  try {
    const updatedBook: BookDao = await prisma.bookDao.update({
      where: { ISBN },
      data: updatedDao,
    })
    return updatedBook
  } catch (error) {
    throw new ApiError(
      ApiErrorCodes.BUSINESS_LOGIC_ERROR,
      `This ISBN already exists in the system.`,
    )
  }
}
