import { Router } from 'express'
import { customerGETProxy, customerProxy } from '@mobilebff/services/httpProxy/customerHttpProxy'

/**
 * The router for the customer resource.
 */
const customerRouter = () => {
  const router = Router()

  router.get('/customers', customerGETProxy)
  router.get('/customers/:id', customerGETProxy)
  router.use('/customers', customerProxy)

  return router
}

export default customerRouter
