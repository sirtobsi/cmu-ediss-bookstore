import { Router } from 'express'
import { bookProxy } from '@webbff/services/httpProxy/bookHttpProxy'

/**
 * The router for the book resource.
 */
const bookRouter = () => {
  const router = Router()

  router.use('/books', bookProxy)

  return router
}

export default bookRouter
