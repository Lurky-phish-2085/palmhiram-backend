import express from "express";
import { StatusCodes } from "http-status-codes";

import { createTransport } from "nodemailer";

import { logDebug, logError } from "./utils/logUtils";

const app = express()
const port = 4000

app.use(express.json())

const router = express.Router()

router.get('/v1/ping', (req, res) => {
  return res.status(StatusCodes.OK).json(
    { message: "Hello, World!" }
  )
})

// Generate a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post('/v1/send-verification', async (req, res) => {

  const { body: user } = req
  const displayName = user.name
  const email = user.email
  const subject = "PalmHiram: Account Verification"

  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }

          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          h1 {
              color: #333;
          }

          p {
              color: #555;
          }
      </style>
  </head>

  <body>
      <div class="container">
          <h1>${subject}</h1>
          <p>Dear ${displayName},</p>
          <p>Welcome to PalmHiram! You are almost there!</p>

          <p>You already have an account with us, but in order to make business with us,
             we kindly ask you to complete the verification process by
             obtaining a verification code from our agent.
          </p>

          <p>Please contact our verification agent at [Agent Email or Phone] to obtain the code.</p>

          <p>If you have any questions or need assistance, feel free to reply to this email.</p>

          <p>Thank you for choosing PalmHiram!</p>
          <p>Best regards,<br>PalmHiram</p>
      </div>
  </body>

  </html>
  `

  let mailTransporter = createTransport({
    service: "gmail",
    auth: {
      user: "danangelotorrecampo@gmail.com",
      pass: "egoaukqxlfgwkaki",
    }
  })

  let details = {
    from: "danangelotorrecampo@gmail.com",
    to: email,
    subject: subject,
    text: content,
    html: content
  }

  try {
    let info = await mailTransporter.sendMail(details)

    res.status(StatusCodes.CREATED).json({
      status: "OK",
      message: "SUCCESS!",
    })

    logDebug('/v1/send-verification', ` email sent successfully to ${email}`)

  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "BAD",
      message: error
    })

    logError('/v1/send-verification', `email failed to send! ${error}`)
  }
})

router.post('/v1/send-otp', async (req, res) => {
  const min = 10000000
  const max = 19999999
  const otp = getRandomInt(min, max)

  const { body: user } = req
  const displayName = user.name
  const email = user.email
  const subject = "PalmHiram: Email Verification"

  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
  </head>
  <body>
      <p>Dear ${displayName},</p>

      <p>Welcome to Palm Hiram! We're excited to have you on board.</p>

      <p>To complete your account setup, please use the following one-time password (OTP):</p>

      <h2 style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; text-align: center;">${otp}</h2>

      <p>This OTP is valid for a short period, so please enter it promptly to ensure a smooth registration process. If you didn't request this OTP, please contact our support immediately at [Your Support Email or Phone Number].</p>

      <p>Thank you for choosing Palm Hiram. We look forward to serving you!</p>

      <p>Best regards,<br>
      Palm Hiram Team</p>
  </body>
  </html>
  `

  let mailTransporter = createTransport({
    service: "gmail",
    auth: {
      user: "danangelotorrecampo@gmail.com",
      pass: "egoaukqxlfgwkaki",
    }
  })

  let details = {
    from: "danangelotorrecampo@gmail.com",
    to: email,
    subject: subject,
    text: content,
    html: content
  }

  try {
    let info = await mailTransporter.sendMail(details)

    res.status(StatusCodes.CREATED).json({
      message: "SUCCESS!!!",
      otp
    })

    logDebug('/v1/send-otp', `email sent successfully to ${email}`)

  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error
    })

    logError('/v1/send-otp', `email failed to send!, ${error}`)
  }
})

app.use('/', router)

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})
