import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

// getting env variables
dotenv.config()
const URL = process.env as unknown as string
// create app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
// initiate server
const port = 5000
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
  console.log(`Please visit ${URL} to run your app`)
})

app.get('/', (req, res) => {
  res.send('Hello world')
})
