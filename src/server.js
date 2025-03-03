const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db');
const cors = require("cors");
const sectionRoutes = require("./routes/sectionRoutes");
const quizRoutes = require('./routes/quizRoutes'); // استيراد مسارات الكويز
const lessonRoutes = require("./routes/lessonRoutes");
const bodyParser = require('body-parser');
const path = require("path");
const chatbotRoutes = require('./routes/chatbotRoutes'); // Ensure this path is correct

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

///

app.use(bodyParser.json()); // تأكد من معالجة JSON بشكل صحيح
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use("/sections", sectionRoutes);
// app.use('/quiz', quizRoutes); // ربط مسارات الكويز
// app.use('/api/quiz', quizRoutes);

app.use('/api/quiz', quizRoutes); // تعديل المسار ليكون ضمن '/api/'

app.use("/api", lessonRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use("/videos", express.static(path.join(__dirname, "public/videos")));


// Database Connection
sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


///
