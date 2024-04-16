import { Router } from 'express'
import { bookGETProxy, bookProxy } from '@mobilebff/services/httpProxy/bookHttpProxy'

/**
 * The router for the book resource.
 */
const bookRouter = () => {
  const router = Router()

  router.get('/books/isbn/:isbn', bookGETProxy)
  router.get('/books/:isbn', bookGETProxy)
  router.get('/books/:isbn/related-books', bookProxy)
  router.use('/books', bookProxy)

  return router
}

export default bookRouter
