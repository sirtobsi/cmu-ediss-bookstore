import { Router } from 'express'
import {
  getCustomers,
  getCustomersById,
  postCustomers,
} from 'src/constrollers/customerController'
import asyncWrapper from '@common/middleware/errorhandler/asyncWrapper'

/**
 * The router for the customer resource.
 */
const customerRouter = () => {
  const router = Router()

  router.post('/', asyncWrapper(postCustomers))
  router.get('/', asyncWrapper(getCustomers))
  router.get('/:id', asyncWrapper(getCustomersById))

  return router
}

export default customerRouter
