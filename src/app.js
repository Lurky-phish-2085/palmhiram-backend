import express from "express";
import { StatusCodes } from "http-status-codes";

import { createTransport } from "nodemailer";

const app = express()
const port = 4000

app.use(express.json())

const router = express.Router()

router.get('/v1/ping', (req, res) => {
  return res.status(StatusCodes.OK).json(
    { message: "Hello, World!" }
  )
})

router.get('/v1/send-otp', async (req, res) => {
  const { body: user } = req
  const email = user.email

  const content = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Email Verification</title>
  </head>
  <body>
      <p>Dear [User's Name],</p>

      <p>Welcome to [Your Company/Service Name]! We're excited to have you on board.</p>

      <p>To complete your account setup, please use the following one-time password (OTP):</p>

      <h2 style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; text-align: center;">[Your OTP Here]</h2>

      <p>This OTP is valid for a short period, so please enter it promptly to ensure a smooth registration process. If you didn't request this OTP, please contact our support immediately at [Your Support Email or Phone Number].</p>

      <p>Thank you for choosing [Your Company/Service Name]. We look forward to serving you!</p>

      <p>Best regards,<br>
      [Your Company/Service Name] Team</p>
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
    subject: "Email Verification",
    html: content
  }

  try {
    let info = await mailTransporter.sendMail(details)

    res.status(StatusCodes.CREATED).json({
      message: "SUCCESS!!!",
      info
    })

    console.log(`/v1/send-otp: email sent successfully to ${email}`)

  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error
    })

    console.log('/v1/send-otp: email failed to send!', error)
  }
})

app.use('/', router)

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})
