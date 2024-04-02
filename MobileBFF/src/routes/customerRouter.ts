import { Router } from 'express'
import { customerProxy } from 'src/services/httpProxy/customerHttpProxy'

/**
 * The router for the customer resource.
 */
const customerRouter = () => {
  const router = Router()

  router.post('/', customerProxy)
  router.get('/', customerProxy)
  router.get('/:id', customerProxy)

  return router
}

export default customerRouter
