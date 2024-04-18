import nodemailer from 'nodemailer'
import env from '../config/env'
import logger from '@common/middleware/logger/logger'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

/**
 * Sends an email with the given text and subject from edissbookstore@gmail.com
 * @param {string} to the email address to send the email to.
 * @param {string} subject the subject of the email. 
 * @param {string} text the content of the email. 
 */
export const sendEmail = (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'edissbookstore@gmail.com',
      pass: env.GMAIL_APP_PASSWORD,
    },
  })

  const mailOptions = {
    from: 'edissbookstore@gmail.com',
    to,
    subject,
    text,
  }

  transporter.sendMail(mailOptions, (error: Error | null, info: SMTPTransport.SentMessageInfo) => {
    if (error) {
      logger.error(`Error sending email: ${error.message}`)
    } else {
      logger.info(`Email sent: ${info.response}`)
    }
  })
}