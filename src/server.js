// const express = require('express');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
// const achievementsRoutes = require('./routes/achievementRoutes');
// const sequelize = require('./config/db');
// const cors = require("cors");
// const sectionRoutes = require("./routes/sectionRoutes");
// const quizRoutes = require('./routes/quizRoutes');
// const lessonRoutes = require("./routes/lessonRoutes");
// const bodyParser = require('body-parser');
// const path = require("path");
// const chatbotRoutes = require('./routes/chatbotRoutes');
// const cookieParser = require("cookie-parser");
// const models = require('./models/index');
// const avatarRoutes = require('./routes/avatarRoutes');
// const motivationRoutes = require('./routes/motivationRoutes');
// const feedbackRoutes = require('./routes/feedbackRoutes');
// const analyticsEventRoutes = require('./routes/analyticsEventRoutes');

// dotenv.config();

// const app = express();

// app.use(cookieParser());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));



// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// app.get('/ping', (req, res) => {
//   res.status(200).json({ message: 'Server is up' });
// });

// app.use('/api/users', userRoutes);
// app.use('/api/achievements', achievementsRoutes);
// app.use("/sections", sectionRoutes);
// app.use('/api/quiz', quizRoutes);
// app.use("/api", lessonRoutes);
// app.use('/api/chatbot', chatbotRoutes);
// app.use("/videos", express.static(path.join(__dirname, "public/videos")));
// app.use("/images", express.static(path.join(__dirname, "public/images")));
// app.use('/', avatarRoutes);
// app.use('/api', motivationRoutes);
// app.use('/api/feedback', feedbackRoutes);
// app.use('/api', analyticsEventRoutes);

// sequelize.sync()
//   .then(() => console.log("Database connected"))
//   .catch(err => console.log("Database error:", err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
const cookieParser = require("cookie-parser");
const models = require('./models/index');
const avatarRoutes = require('./routes/avatarRoutes');
const motivationRoutes = require('./routes/motivationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const analyticsEventRoutes = require('./routes/analyticsEventRoutes');

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  origin:  ['https://pymagic-gules.vercel.app'] ,
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
app.use("/videos", express.static(path.join(__dirname, "public/videos")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use('/avatar', avatarRoutes);
app.use('/api', motivationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', analyticsEventRoutes);


sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});