const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const connectToDB = require('./database/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const mapRoutes = require('./routes/map.routes')
const rideRoutes = require('./routes/ride.routes')

connectToDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));


app.get('/', function(req,res){
  res.send('Hello World')
})

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
app.use('/maps', mapRoutes)
app.use('/rides', rideRoutes)

module.exports = app;