const User = require('./user');
const Motivation = require('./motivation');
const Reward = require('./reward');
const Achievement = require('./achievement');
const Chatbot = require('./chatbot');
const Section = require('./section');
const Unit = require('./unit');
const Lesson = require('./lesson');
const Question = require('./question');
const StudentQuiz = require('./student_quiz');
const StudentQuizQuestion = require('./student_quiz_question');

// Example associations:
User.hasMany(Achievement, { foreignKey: 'user_id', as: 'achievements' });
Achievement.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Reward.hasMany(Achievement, { foreignKey: 'reward_id', as: 'achievements' });
Achievement.belongsTo(Reward, { foreignKey: 'reward_id', as: 'reward' });

Section.hasMany(Unit, { foreignKey: 'section_id', as: 'units' });
Unit.belongsTo(Section, { foreignKey: 'section_id', as: 'section' });

Unit.hasMany(Lesson, { foreignKey: 'unit_id', as: 'lessons' });  // No change needed
Lesson.belongsTo(Unit, { foreignKey: 'unit_id', as: 'unit' });   // No change needed

Lesson.hasMany(Question, { foreignKey: 'lesson_id', as: 'questions' });
Question.belongsTo(Lesson, { foreignKey: 'lesson_id', as: 'lesson' });

User.hasMany(StudentQuiz, { foreignKey: 'user_id', as: 'quizzes' });
StudentQuiz.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Lesson.hasMany(StudentQuiz, { foreignKey: 'lesson_id', as: 'quizzes' });
StudentQuiz.belongsTo(Lesson, { foreignKey: 'lesson_id', as: 'lesson' });

Unit.hasMany(StudentQuiz, { foreignKey: 'unit_id', as: 'quizzes' });
StudentQuiz.belongsTo(Unit, { foreignKey: 'unit_id', as: 'unit' });

Question.hasMany(StudentQuizQuestion, { foreignKey: 'question_id', as: 'quizQuestions' });
StudentQuizQuestion.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

StudentQuiz.hasMany(StudentQuizQuestion, { foreignKey: 'quiz_id', as: 'questions' });
StudentQuizQuestion.belongsTo(StudentQuiz, { foreignKey: 'quiz_id', as: 'quiz' });

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
