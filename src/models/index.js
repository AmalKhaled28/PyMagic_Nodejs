const User = require("./user");
const Motivation = require("./motivation");
const Reward = require("./reward");
const Achievement = require("./achievement");
const Chatbot = require("./chatbot");
const Section = require("./section");
const Unit = require("./unit");
const Lesson = require("./lesson");
const Question = require("./question");
const StudentQuiz = require("./student_quiz");
const StudentQuizQuestion = require("./student_quiz_question");
const AnswerMotivation = require("./answer_motivation");
const AnswerMotivationTranslation = require("./answer_motivation_translations");
const Asset = require("./assets");
const UserAsset = require("./user_assets");
const UserPreference = require("./user_preferences");
const SectionTranslation = require("./section_translations");
const UnitTranslation = require("./unit_translations");
const LessonTranslation = require("./lesson_translations");
const MotivationTranslation = require("./motivation_translations");
const QuestionTranslation = require("./question_translations");
const RewardTranslation = require("./reward_translations");
const Feedback = require("./feedbacks");
const AnalyticsEvent = require("./AnalyticsEvent");

// for associations:
User.hasMany(Achievement, { foreignKey: "user_id", as: "achievements" });
Achievement.belongsTo(User, { foreignKey: "user_id", as: "user" });

Reward.hasMany(Achievement, { foreignKey: "reward_id", as: "achievements" });
Achievement.belongsTo(Reward, { foreignKey: "reward_id", as: "reward" });

Section.hasMany(Unit, { foreignKey: "section_id", as: "units" });
Unit.belongsTo(Section, { foreignKey: "section_id", as: "section" });

Unit.hasMany(Lesson, { foreignKey: "unit_id", as: "lessons" });
Lesson.belongsTo(Unit, { foreignKey: "unit_id", as: "unit" });

Lesson.hasMany(Question, { foreignKey: "lesson_id", as: "questions" });
Question.belongsTo(Lesson, { foreignKey: "lesson_id", as: "lesson" });

User.hasMany(StudentQuiz, { foreignKey: "user_id", as: "quizzes" });
StudentQuiz.belongsTo(User, { foreignKey: "user_id", as: "user" });

Lesson.hasMany(StudentQuiz, { foreignKey: "lesson_id", as: "quizzes" });
StudentQuiz.belongsTo(Lesson, { foreignKey: "lesson_id", as: "lesson" });

Unit.hasMany(StudentQuiz, { foreignKey: "unit_id", as: "quizzes" });
StudentQuiz.belongsTo(Unit, { foreignKey: "unit_id", as: "unit" });

Question.hasMany(StudentQuizQuestion, {
  foreignKey: "question_id",
  as: "quizQuestions",
});
StudentQuizQuestion.belongsTo(Question, {
  foreignKey: "question_id",
  as: "question",
});

StudentQuiz.hasMany(StudentQuizQuestion, {
  foreignKey: "quiz_id",
  as: "questions",
});
StudentQuizQuestion.belongsTo(StudentQuiz, {
  foreignKey: "quiz_id",
  as: "quiz",
});

User.hasMany(UserAsset, { foreignKey: "user_id", as: "userAssets" });
UserAsset.belongsTo(User, { foreignKey: "user_id", as: "user" });
UserAsset.belongsTo(Asset, { foreignKey: "asset_id", as: "asset" });

User.hasOne(UserPreference, { foreignKey: "user_id", as: "preference" });
UserPreference.belongsTo(User, { foreignKey: "user_id", as: "user" });

AnswerMotivation.hasMany(AnswerMotivationTranslation, {
  foreignKey: "answer_motivation_id",
  as: "translations",
});

AnswerMotivationTranslation.belongsTo(AnswerMotivation, {
  foreignKey: "answer_motivation_id",
  as: "answerMotivation",
});

Section.hasMany(SectionTranslation, {
  foreignKey: "section_id",
  as: "translations",
});

SectionTranslation.belongsTo(Section, {
  foreignKey: "section_id",
  as: "section",
});

Unit.hasMany(UnitTranslation, {
  foreignKey: "unit_id",
  as: "translations",
});

UnitTranslation.belongsTo(Unit, {
  foreignKey: "unit_id",
  as: "unit",
});

Lesson.hasMany(LessonTranslation, {
  foreignKey: "lesson_id",
  as: "translations",
});

LessonTranslation.belongsTo(Lesson, {
  foreignKey: "lesson_id",
  as: "lesson",
});

Motivation.hasMany(MotivationTranslation, {
  foreignKey: "motivation_id",
  as: "translations",
});

MotivationTranslation.belongsTo(Motivation, {
  foreignKey: "motivation_id",
  as: "motivation",
});

Question.hasMany(QuestionTranslation, {
  foreignKey: "question_id",
  as: "translations",
});

QuestionTranslation.belongsTo(Question, {
  foreignKey: "question_id",
  as: "parent_question",
});

Reward.hasMany(RewardTranslation, {
  foreignKey: "reward_id",
  as: "translations",
});

RewardTranslation.belongsTo(Reward, {
  foreignKey: "reward_id",
  as: "reward",
});

User.hasMany(Feedback, { foreignKey: "user_id", as: "feedbacks" });
Feedback.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(AnalyticsEvent, { foreignKey: "user_id", as: "analyticsEvents" });
AnalyticsEvent.belongsTo(User, { foreignKey: "user_id", as: "user" });

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
  StudentQuizQuestion,
  AnswerMotivation,
  AnswerMotivationTranslation,
  Asset,
  UserAsset,
  UserPreference,
  SectionTranslation,
  UnitTranslation,
  LessonTranslation,
  MotivationTranslation,
  QuestionTranslation,
  RewardTranslation,
  Feedback,
  AnalyticsEvent,
};
