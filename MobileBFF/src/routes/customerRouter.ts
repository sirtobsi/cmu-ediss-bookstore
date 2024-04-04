import { Router } from 'express'
import { customerGETProxy, customerProxy } from '@mobilebff/services/httpProxy/customerHttpProxy'

/**
 * The router for the customer resource.
 */
const customerRouter = () => {
  const router = Router()

  router.get('/', customerGETProxy)
  router.use('/', customerProxy)

  return router
}

export default customerRouter
