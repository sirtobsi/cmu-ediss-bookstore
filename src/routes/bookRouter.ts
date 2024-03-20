import { Router } from 'express'
import {
  getBookByISBN,
  postBooks,
  putBookByISBN,
} from 'src/constrollers/bookController'
import asyncWrapper from 'src/middleware/errorhandler/asyncWrapper'

/**
 * The router for the book resource.
 */
const bookRouter = () => {
  const router = Router()

  router.post('/', asyncWrapper(postBooks))
  router.get('/isbn/:ISBN', asyncWrapper(getBookByISBN))
  router.get('/:ISBN', asyncWrapper(getBookByISBN))
  router.put('/:ISBN', asyncWrapper(putBookByISBN))

  return router
}

export default bookRouter
