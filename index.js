const express = require('express')
const cors = require('cors')
require('./db/mongoose')
require('dotenv').config()

const contactRouter = require('./routers/contact')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(contactRouter)

app.use(
  cors({
    origin: '*',
  }),
)

app.get('/', (req, res) => {
  res.send({ msg: 'Hey congratulations, we are connected' })
})

app.listen(process.env.PORT, () => {
  console.log('Server is up on port ' + port)
})
