import { load } from 'ts-dotenv'

/**
 * Environment variables
 */
export default load({
  SERVICEPORT: {
    type: String,
    optional: false,
  },
  GMAIL_APP_PASSWORD: {
    type: String,
    optional: false,
  },
})
