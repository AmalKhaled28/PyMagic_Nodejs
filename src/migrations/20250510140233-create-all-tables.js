'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create users table
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      email: { type: Sequelize.STRING(255), unique: true, allowNull: false },
      password: { type: Sequelize.STRING(255), allowNull: false },
      last_login_at: { type: Sequelize.DATE },
      earned_points: { type: Sequelize.INTEGER },
      game_level: { type: Sequelize.INTEGER },
      parent_email: { type: Sequelize.STRING(255), unique: true },
      age: { type: Sequelize.INTEGER, allowNull: false },
      verified: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create motivations table
    await queryInterface.createTable('motivations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      score_level: { type: Sequelize.STRING(50) },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create motivation_translations table
    await queryInterface.createTable('motivation_translations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      motivation_id: { type: Sequelize.INTEGER, references: { model: 'motivations', key: 'id' } },
      language: { type: Sequelize.STRING(50) },
      text: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create answer_motivation table
    await queryInterface.createTable('answer_motivation', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      answer_type: { type: Sequelize.ENUM('correct', 'wrong') },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create answer_motivation_translations table
    await queryInterface.createTable('answer_motivation_translations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      answer_motivation_id: { type: Sequelize.INTEGER, references: { model: 'answer_motivation', key: 'id' } },
      language: { type: Sequelize.STRING(50) },
      text: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create rewards table
    await queryInterface.createTable('rewards', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      image: { type: Sequelize.STRING(255) },
      required_points: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create reward_translations table
    await queryInterface.createTable('reward_translations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      reward_id: { type: Sequelize.INTEGER, references: { model: 'rewards', key: 'id' } },
      language: { type: Sequelize.STRING(50) },
      text: { type: Sequelize.STRING(255) },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create achievements table
    await queryInterface.createTable('achievements', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' } },
      reward_id: { type: Sequelize.INTEGER, references: { model: 'rewards', key: 'id' } },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create chatbot table
    await queryInterface.createTable('chatbot', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' } },
      prompt: { type: Sequelize.TEXT },
      answer: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create sections table
    await queryInterface.createTable('sections', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create section_translations table
    await queryInterface.createTable('section_translations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      section_id: { type: Sequelize.INTEGER, references: { model: 'sections', key: 'id' } },
      language: { type: Sequelize.STRING(50) },
      name: { type: Sequelize.STRING(255) },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create units table
    await queryInterface.createTable('units', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      section_id: { type: Sequelize.INTEGER, references: { model: 'sections', key: 'id' } },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create unit_translations table
    await queryInterface.createTable('unit_translations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      unit_id: { type: Sequelize.INTEGER, references: { model: 'units', key: 'id' } },
      language: { type: Sequelize.STRING(50) },
      name: { type: Sequelize.STRING(255) },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create lessons table
    await queryInterface.createTable('lessons', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      unit_id: { type: Sequelize.INTEGER, references: { model: 'units', key: 'id' } },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create lesson_translations table
    await queryInterface.createTable('lesson_translations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      lesson_id: { type: Sequelize.INTEGER, references: { model: 'lessons', key: 'id' } },
      language: { type: Sequelize.STRING(50) },
      title: { type: Sequelize.STRING(255) },
      flash_card: { type: Sequelize.TEXT },
      video_url: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create questions table
await queryInterface.createTable('questions', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  lesson_id: { type: Sequelize.INTEGER, references: { model: 'lessons', key: 'id' } },
  type: { type: Sequelize.ENUM('multiple_choice', 'true_false') },
  level: { type: Sequelize.ENUM('easy', 'medium', 'hard') },
  points: { type: Sequelize.INTEGER },
  created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
  updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }, // إضافة العمود
});

    // Create question_translations table
    await queryInterface.createTable('question_translations', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      question_id: { type: Sequelize.INTEGER, references: { model: 'questions', key: 'id' } },
      language: { type: Sequelize.STRING(50) },
      question_text: { type: Sequelize.TEXT },
      options: { type: Sequelize.JSON },
      correct_answer: { type: Sequelize.TEXT },
      hint: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create student_quizzes table
    await queryInterface.createTable('student_quizzes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      lesson_id: { type: Sequelize.INTEGER, references: { model: 'lessons', key: 'id' } },
      unit_id: { type: Sequelize.INTEGER, references: { model: 'units', key: 'id' } },
      user_id: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' } },
      is_passed: { type: Sequelize.BOOLEAN },
      score: { type: Sequelize.INTEGER },
      earned_points: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create student_quiz_questions table
    await queryInterface.createTable('student_quiz_questions', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      question_id: { type: Sequelize.INTEGER, references: { model: 'questions', key: 'id' } },
      quiz_id: { type: Sequelize.INTEGER, references: { model: 'student_quizzes', key: 'id' } },
      answer: { type: Sequelize.TEXT },
      is_correct: { type: Sequelize.BOOLEAN },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create assets table
    await queryInterface.createTable('assets', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      type: { type: Sequelize.ENUM('brow', 'eye', 'hairstyle', 'headdress', 'lip'), allowNull: false },
      name: { type: Sequelize.STRING(50), allowNull: false },
      image_url: { type: Sequelize.STRING(255), allowNull: false },
      price: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create user_assets table
    await queryInterface.createTable('user_assets', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' } },
      asset_id: { type: Sequelize.INTEGER, references: { model: 'assets', key: 'id' } },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create user_preferences table
    await queryInterface.createTable('user_preferences', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, allowNull: false },
      brow: { type: Sequelize.STRING(255) },
      eye: { type: Sequelize.STRING(255) },
      hairstyle: { type: Sequelize.STRING(255) },
      lip: { type: Sequelize.STRING(255) },
      headdress: { type: Sequelize.STRING(255) },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create feedbacks table
    await queryInterface.createTable('feedbacks', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' } },
      student_quiz_id: { type: Sequelize.INTEGER, references: { model: 'student_quizzes', key: 'id' } },
      feedback_score: { type: Sequelize.INTEGER },
      comment: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // Create analytics_events table
    await queryInterface.createTable('analytics_events', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      event_type: { type: Sequelize.STRING(100) },
      event_data: { type: Sequelize.JSON },
      duration: { type: Sequelize.INTEGER },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
      timestamp: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('analytics_events');
    await queryInterface.dropTable('feedbacks');
    await queryInterface.dropTable('user_preferences');
    await queryInterface.dropTable('user_assets');
    await queryInterface.dropTable('assets');
    await queryInterface.dropTable('student_quiz_questions');
    await queryInterface.dropTable('student_quizzes');
    await queryInterface.dropTable('question_translations');
    await queryInterface.dropTable('questions');
    await queryInterface.dropTable('lesson_translations');
    await queryInterface.dropTable('lessons');
    await queryInterface.dropTable('unit_translations');
    await queryInterface.dropTable('units');
    await queryInterface.dropTable('section_translations');
    await queryInterface.dropTable('sections');
    await queryInterface.dropTable('chatbot');
    await queryInterface.dropTable('achievements');
    await queryInterface.dropTable('reward_translations');
    await queryInterface.dropTable('rewards');
    await queryInterface.dropTable('answer_motivation_translations');
    await queryInterface.dropTable('answer_motivation');
    await queryInterface.dropTable('motivation_translations');
    await queryInterface.dropTable('motivations');
    await queryInterface.dropTable('users');
  }
};

//npx sequelize-cli db:migrate