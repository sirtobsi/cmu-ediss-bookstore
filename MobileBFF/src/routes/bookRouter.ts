import { Router } from 'express'
import { bookGETProxy, bookProxy } from '@mobilebff/services/httpProxy/bookHttpProxy'

/**
 * The router for the book resource.
 */
const bookRouter = () => {
  const router = Router()

  router.get('/', bookGETProxy)
  router.use('/', bookProxy)

  return router
}

export default bookRouter
