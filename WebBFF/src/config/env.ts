import { load } from 'ts-dotenv'

/**
 * Environment variables
 */
export default load({
  BFFPORT: {
    type: String,
    optional: false,
  },
  BASEURL_CUSTOMER: {
    type: String,
    optional: false,
  },
  BASEURL_BOOK: {
    type: String,
    optional: false,
  },
})
