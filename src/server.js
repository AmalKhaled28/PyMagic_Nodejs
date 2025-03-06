const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const achievementsRoutes = require('./routes/achievementRoutes');
const sequelize = require('./config/db');
const cors = require("cors");
const sectionRoutes = require("./routes/sectionRoutes");
const quizRoutes = require('./routes/quizRoutes');
const lessonRoutes = require("./routes/lessonRoutes");
const bodyParser = require('body-parser');
const path = require("path");
const chatbotRoutes = require('./routes/chatbotRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Import models to ensure associations are loaded
const models = require('./models/index');

app.use(cors()); // Allow all origins temporarily for testing

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  optionsSuccessStatus: 200, // Some browsers (e.g., older IE) require this
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true // Allow cookies if needed
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use("/sections", sectionRoutes);
app.use('/api/quiz', quizRoutes);
app.use("/api", lessonRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use("/videos", express.static(path.join(__dirname, "public/videos")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.use("/images", express.static(path.join(__dirname, "public/images"), {
//   setHeaders: (res, path) => {
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.set('Access-Control-Allow-Methods', 'GET');
//     res.set('Access-Control-Allow-Headers', 'Content-Type');
//     res.set('Access-Control-Max-Age', '86400'); // Cache CORS for 24 hours
//     if (path.endsWith('.svg')) {
//       res.set('Content-Type', 'image/svg+xml'); // Ensure SVG MIME type
//     }
//   }
// }));


// Database Connection
sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));