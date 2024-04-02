/**
 * Book controller handling the book routes.
 */

import { BookDto } from '@api/generated'
import { BookDao } from '@prisma/client'
import { Request, Response } from 'express'
import {
  createBook,
  findBookByISBN,
  updateBookByISBN,
} from 'src/services/bookService'
import { convertBookDaoToDto } from 'src/services/converters/bookConverterService'
import { validateBookDto, validateISBN } from 'src/services/validators/bookValidatorService'

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
