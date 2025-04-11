const { AnalyticsEvent, User } = require('../models');

const logEvent = async (req, res) => {
  const { user_id, event_type, event_data, duration } = req.body;

  try {
    // Validate required fields
    if (!user_id || !event_type) {
      return res.status(400).json({ success: false, message: 'user_id and event_type are required' });
    }

    // Verify user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create the event
    const event = await AnalyticsEvent.create({
      user_id,
      event_type,
      event_data,
      duration,
    });

    res.status(201).json({ success: true, id: event.id });
  } catch (error) {
    console.error('Error logging analytics event:', error);
    res.status(500).json({ success: false, message: 'Failed to log event' });
  }
};

module.exports = { logEvent };