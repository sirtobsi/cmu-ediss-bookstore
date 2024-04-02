import { Router } from 'express'
import {
  getCustomers,
  getCustomersById,
  postCustomers,
} from '../constrollers/customerController'
import asyncWrapper from '@common/middleware/errorhandler/asyncWrapper'

/**
 * The router for the customer resource.
 */
const customerRouter = () => {
  const router = Router()

  router.post('/customers', asyncWrapper(postCustomers))
  router.get('/customers', asyncWrapper(getCustomers))
  router.get('/customers/:id', asyncWrapper(getCustomersById))

  return router
}

export default customerRouter
