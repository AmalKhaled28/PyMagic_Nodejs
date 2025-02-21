const express = require('express')
const app = express()
const sequelize = require('./config/db') 
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
})

const PORT = process.env.PORT || 5000

sequelize.sync({ alter: true }) // Ensures models are synced with DB
  .then(() => {
    console.log('Database connected & synced')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => console.error('DB sync error:', err))
