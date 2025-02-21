const User = require('./user');
const Motivation = require('./motivation');
const Reward = require('./reward');
const Achievement = require('./achievement');
const Chatbot = require('./chatbot');
const Section = require('./section');
const Unit = require('./unit');
const Lesson = require('./lesson');
const Question = require('./question');
const StudentQuiz = require('./studentQuiz');
const StudentQuizQuestion = require('./studentQuizQuestion');

// Example associations:
User.hasMany(Achievement, { foreignKey: 'user_id' });
Achievement.belongsTo(User, { foreignKey: 'user_id' });

Reward.hasMany(Achievement, { foreignKey: 'reward_id' });
Achievement.belongsTo(Reward, { foreignKey: 'reward_id' });

Section.hasMany(Unit, { foreignKey: 'section_id' });
Unit.belongsTo(Section, { foreignKey: 'section_id' });

Unit.hasMany(Lesson, { foreignKey: 'unit_id' });
Lesson.belongsTo(Unit, { foreignKey: 'unit_id' });

Lesson.hasMany(Question, { foreignKey: 'lesson_id' });
Question.belongsTo(Lesson, { foreignKey: 'lesson_id' });

User.hasMany(StudentQuiz, { foreignKey: 'user_id' });
StudentQuiz.belongsTo(User, { foreignKey: 'user_id' });

Lesson.hasMany(StudentQuiz, { foreignKey: 'lesson_id' });
StudentQuiz.belongsTo(Lesson, { foreignKey: 'lesson_id' });

Unit.hasMany(StudentQuiz, { foreignKey: 'unit_id' });
StudentQuiz.belongsTo(Unit, { foreignKey: 'unit_id' });

Question.hasMany(StudentQuizQuestion, { foreignKey: 'question_id' });
StudentQuizQuestion.belongsTo(Question, { foreignKey: 'question_id' });

StudentQuiz.hasMany(StudentQuizQuestion, { foreignKey: 'quiz_id' });
StudentQuizQuestion.belongsTo(StudentQuiz, { foreignKey: 'quiz_id' });

module.exports = {
  User,
  Motivation,
  Reward,
  Achievement,
  Chatbot,
  Section,
  Unit,
  Lesson,
  Question,
  StudentQuiz,
  StudentQuizQuestion
};
