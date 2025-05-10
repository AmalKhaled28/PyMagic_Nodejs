const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const achievementsRoutes = require('./src/routes/achievementRoutes');
const sequelize = require('./src/config/db');
const cors = require("cors");
const sectionRoutes = require("./src/routes/sectionRoutes");
const quizRoutes = require('./src/routes/quizRoutes');
const lessonRoutes = require("./src/routes/lessonRoutes");
const bodyParser = require('body-parser');
const path = require("path");
const chatbotRoutes = require('./src/routes/chatbotRoutes');
const cookieParser = require("cookie-parser");
const models = require('./src/models/index');
const avatarRoutes = require('./src/routes/avatarRoutes');
const motivationRoutes = require('./src/routes/motivationRoutes');
const feedbackRoutes = require('./src/routes/feedbackRoutes');
const analyticsEventRoutes = require('./src/routes/analyticsEventRoutes');

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Server is up' });
});

app.use('/api/users', userRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use("/sections", sectionRoutes);
app.use('/api/quiz', quizRoutes);
app.use("/api", lessonRoutes);
app.use('/api/chatbot', chatbotRoutes);
// app.use("/videos", express.static(path.join(__dirname, "public/videos"))); // Removed
// app.use("/images", express.static(path.join(__dirname, "public/images"))); // Removed
app.use('/', avatarRoutes);
app.use('/api', motivationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', analyticsEventRoutes);

sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));