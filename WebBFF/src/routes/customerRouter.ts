import { Router } from 'express'
import { customerProxy } from '@webbff/services/httpProxy/customerHttpProxy'

/**
 * The router for the customer resource.
 */
const customerRouter = () => {
  const router = Router()

  router.use('/customers', customerProxy)

  return router
}

export default customerRouter
