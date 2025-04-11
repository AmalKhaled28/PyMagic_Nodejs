// controllers/feedbackController.js
const Feedback = require('../models/feedbacks');
const StudentQuiz = require('../models/student_quiz');
const User = require('../models/user');

exports.submitFeedback = async (req, res) => {
  try {
    const { user_id, student_quiz_id, feedback_score, comment } = req.body;

    // Log incoming request for debugging
    console.log('Feedback submission request:', { user_id, student_quiz_id, feedback_score, comment });

    // Validate required fields
    if (!user_id || !student_quiz_id || !feedback_score) {
      console.warn('Missing required fields:', { user_id, student_quiz_id, feedback_score });
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Validate feedback_score range (1 to 5)
    if (!Number.isInteger(feedback_score) || feedback_score < 1 || feedback_score > 5) {
      console.warn('Invalid feedback score:', feedback_score);
      return res.status(400).json({ success: false, message: 'Feedback score must be an integer between 1 and 5' });
    }

    // Verify user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      console.warn('User not found:', user_id);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify student_quiz_id exists and belongs to the user
    const studentQuiz = await StudentQuiz.findOne({
      where: {
        id: student_quiz_id,
        user_id: user_id,
      },
    });
    if (!studentQuiz) {
      console.warn('Invalid student quiz:', { student_quiz_id, user_id });
      return res.status(404).json({
        success: false,
        message: 'Student quiz not found or does not belong to the user',
      });
    }

    // Check if feedback already exists for this student_quiz_id
    const existingFeedback = await Feedback.findOne({
      where: { student_quiz_id },
    });
    if (existingFeedback) {
      console.warn('Feedback already exists for student_quiz_id:', student_quiz_id);
      return res.status(400).json({
        success: false,
        message: 'Feedback already submitted for this quiz attempt',
      });
    }

    // Create new feedback entry
    const feedback = await Feedback.create({
      user_id,
      student_quiz_id,
      feedback_score,
      comment: comment || null,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback: {
        id: feedback.id,
        user_id: feedback.user_id,
        student_quiz_id: feedback.student_quiz_id,
        feedback_score: feedback.feedback_score,
        comment: feedback.comment,
        created_at: feedback.created_at,
      },
    });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};