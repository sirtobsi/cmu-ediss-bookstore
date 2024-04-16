import { Router } from 'express'
import {
  getBookByISBN,
  getBookByISBNRelatedBooks,
  postBooks,
  putBookByISBN,
} from '@bookservice/constrollers/bookController'
import asyncWrapper from '@common/middleware/errorhandler/asyncWrapper'

/**
 * The router for the book resource.
 */
const bookRouter = () => {
  const router = Router()

  router.post('/books', asyncWrapper(postBooks))
  router.get('/books/isbn/:ISBN', asyncWrapper(getBookByISBN))
  router.get('/books/:ISBN', asyncWrapper(getBookByISBN))
  router.put('/books/:ISBN', asyncWrapper(putBookByISBN))
  router.get('/books/:ISBN/related-books', asyncWrapper(getBookByISBNRelatedBooks))

  return router
}

export default bookRouter
