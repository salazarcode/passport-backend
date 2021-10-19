console.log(require('dotenv').config())
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors({origin:true,credentials: true}))

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(4001, () => console.log('Server has Started')) 
