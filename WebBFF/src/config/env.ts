import { load } from 'ts-dotenv'

/**
 * Environment variables
 */
export default load({
  PORT: {
    type: String,
    optional: false,
  },
  BASEURL: {
    type: String,
    optional: false,
  },
})
