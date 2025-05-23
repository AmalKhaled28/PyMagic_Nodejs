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



// last version

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


// const allowedOrigins = [
//   // 'http://localhost:3000'
//   'https://pymagic-gules.vercel.app'
// ]

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Blocked by CORS'))
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 200
// }


// // app.use((req, res, next) => {
// //   console.log('Incoming origin:', req.headers.origin)
// //   next()
// // })


// app.use(cors(corsOptions))
// app.options('*', cors(corsOptions))


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
// app.use('/avatar', avatarRoutes);
// app.use('/api', motivationRoutes);
// app.use('/api/feedback', feedbackRoutes);
// app.use('/api', analyticsEventRoutes);


// sequelize.sync()
//   .then(() => console.log("Database connected"))
//   .catch(err => console.log("Database error:", err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT}`);
// });





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

// Middleware لتسجيل الرؤوس وملفات تعريف الارتباط
app.use((req, res, next) => {
  console.log('Request headers:', req.headers);
  console.log('Cookies:', req.cookies);
  next();
});

// إعدادات CORS
const allowedOrigins = [
  'https://pymagic-gules.vercel.app'
  // 'http://localhost:3000' // للتطوير المحلي
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Received origin:', origin); // سجل الـ origin لتتبع المشكلة
    // السماح بجميع الـ origins إذا لم يكن هناك origin (مثل طلبات غير متصفح)
    // أو إذا كان الـ origin موجودًا في allowedOrigins
    if (!origin || allowedOrigins.some(allowed => origin === allowed || origin === allowed + '/')) {
      callback(null, true);
    } else {
      console.error('CORS blocked for origin:', origin);
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Accept-Language'],
  optionsSuccessStatus: 200,
  preflightContinue: false
};

app.use(cors(corsOptions));

// التعامل مع طلبات OPTIONS يدويًا
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Accept-Language'],
  optionsSuccessStatus: 200
}));

// مسار اختبار الخادم
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Server is up' });
});

// Routes
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

// الاتصال بقاعدة البيانات
sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database error:", err));

// تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});