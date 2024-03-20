import { BookDto } from '@api/generated'
import { ApiError, ApiErrorCodes } from 'src/middleware/errorhandler/APIError'
import { z } from 'zod'

/**
 * This is a zod schema for the book object used to validate the object.
 */
const bookValidator = z.object({
  ISBN: z.string(),
  title: z.string(),
  Author: z.string(),
  description: z.string(),
  genre: z.string(),
  price: z
    .number()
    .positive()
    .refine(
      value => {
        const decimalCount = (value.toString().split('.')[1] || '').length
        return decimalCount <= 2
      },
      {
        message: 'Price must have at most two decimal places',
      },
    ),
  quantity: z.number().positive().int({ message: 'Quantity must be an integer' }),
})

/**
 * This is a zod schema for the ISBN used to validate the object.
 */
const ISBNValidator = z.string()

/**
 * Validates a book dto object.
 * @param {BookDto} book the BookDto to validate
 * @returns {BookDto} the validated book
 * @throws {ApiError} if the book is invalid
 */
export const validateBookDto = (book: BookDto): BookDto => {
  try {
    return bookValidator.parse(book)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}

/**
 * Validates an ISBN.
 * @param {string} ISBN the ISBN of the book to validate
 * @returns {string} the validated ISBN
 * @throws {ApiError} if the ISBN is invalid
 */
export const validateISBN = (ISBN: string): string => {
  try {
    return ISBNValidator.parse(ISBN)
  } catch (error) {
    throw new ApiError(ApiErrorCodes.BAD_REQUEST, String(error))
  }
}