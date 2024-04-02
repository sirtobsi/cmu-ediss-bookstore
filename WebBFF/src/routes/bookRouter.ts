import { Router } from 'express'
import { bookProxy } from 'src/services/httpProxy/bookHttpProxy'

/**
 * The router for the book resource.
 */
const bookRouter = () => {
  const router = Router()

  router.post('/', bookProxy)
  router.get('/isbn/:ISBN', bookProxy)
  router.get('/:ISBN', bookProxy)
  router.put('/:ISBN', bookProxy)

  return router
}

export default bookRouter
