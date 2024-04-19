/**
 * Book controller handling the book routes.
 */

import { BookDto, RelatedBookDto } from '@api/generated'
import { BookDao } from '@prisma/client'
import { Request, Response } from 'express'
import {
  createBook,
  findBookByISBN,
  recommenderServiceCircuitBreaker,
  updateBookByISBN,
} from '@bookservice/services/bookService'
import { convertBookDaoToDto } from '@bookservice/services/converters/bookConverterService'
import {
  validateBookDto,
  validateISBN,
} from '@bookservice/services/validators/bookValidatorService'
import {
  ApiError,
  ApiErrorCodes,
} from '@common/middleware/errorhandler/APIError'

/**
 * Add a new book.
 * @param {Request<any, any, BookDto>} req the incoming request including the book to add.
 * @param {Response<ItemDto>} res the outgoing response including the newly added book.
 */
export const postBooks = async (
  req: Request<any, any, BookDto>,
  res: Response<BookDto>,
) => {
  const book: BookDto = validateBookDto(req.body)

  const newBook: BookDao = await createBook(book)
  const bookDto: BookDto = convertBookDaoToDto(newBook)

  res.status(201).json(bookDto)
}

/**
 * Get a book by its isbn.
 * @param {Request<{ ISBN: string }>} req the incoming request with the books isbn.
 * @param {Response<BookDto>} res the outgoing response including the retrieved book.
 */
export const getBookByISBN = async (
  req: Request<{ ISBN: string }>,
  res: Response<BookDto>,
) => {
  const ISBN = validateISBN(req.params.ISBN)

  const retrievedBook: BookDao = await findBookByISBN(ISBN)
  const bookDto: BookDto = convertBookDaoToDto(retrievedBook)

  res.status(200).json(bookDto)
}

/**
 * Update a book by its isbn.
 * @param {Request<{ ISBN: string }, any, BookDto>} req the incoming request with the book's isbn and updated data.
 * @param {Response<BookDto>} res the outgoing response including the updated book.
 */
export const putBookByISBN = async (
  req: Request<{ ISBN: string }, any, BookDto>,
  res: Response<BookDto>,
) => {
  const ISBN = validateISBN(req.params.ISBN)
  const updatedBookData: BookDto = validateBookDto(req.body)

  const updatedBook: BookDao = await updateBookByISBN(ISBN, updatedBookData)
  const bookDto: BookDto = convertBookDaoToDto(updatedBook)

  res.status(200).json(bookDto)
}

export const getBookByISBNRelatedBooks = async (
  req: Request<{ ISBN: string }>,
  res: Response<RelatedBookDto[]>,
) => {
  const ISBN = validateISBN(req.params.ISBN)

  const circuitBreakerWasHalfOpen: boolean =
    recommenderServiceCircuitBreaker.toJSON().state.halfOpen

  try {
    const recommendedBooks: RelatedBookDto[] =
      await recommenderServiceCircuitBreaker.fire(ISBN)

    if (recommendedBooks.length === 0) {
      res.status(204).send()
      return
    }
    res.status(200).json(recommendedBooks)
    return
  } catch (error) {

    // if the circuit breaker is open OR is half open and fails, return a 503
    if ((error as any).code === 'EOPENBREAKER' || circuitBreakerWasHalfOpen) {
      throw new ApiError(
        ApiErrorCodes.SERVICE_UNAVAILABLE,
        'Service unavailable',
      )
    }

    // if circuit breaker was closed and failed, return a 504
    if ((error as any).code === 'ETIMEDOUT') {
      throw new ApiError(ApiErrorCodes.GATEWAY_TIMEOUT, 'Request timed out')
    }

    res.status(500).send()
  }
}
