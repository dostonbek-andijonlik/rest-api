import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'

dotenv.config()
const app = express()

//middleware 
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded())

//Database
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
  autoIndex: false
}, (err) => {
  if(err) throw err
  console.log('MongoDB connection.');
  
})

//Routes

app.use('/api', routes)

//Start server listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Express is listening on port http://localhost:${PORT}`);
  
})