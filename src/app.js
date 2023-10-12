import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express()
const port = 3000

app.use(express.json())

const router = express.Router()

router.get('/v1/ping', (req, res) => {
  return res.status(StatusCodes.OK).json(
    { message: "Hello, World!" }
  )
})

app.use('/', router)

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})
