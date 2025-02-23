const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db');

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Database Connection
sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));