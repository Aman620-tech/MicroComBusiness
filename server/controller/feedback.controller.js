const {
  feedbackCreate,
  allFeedbackView,
  SingleFeedbackView,
} = require("../model/feedback/feedback.function");

const businessFeedback =async (req, res, next) => {
  try {
    const { comment, rating, suggestions } = req.body;
    const feedbackData = {
      comment,
      rating,
      suggestions,
      userId: req.user._id,
      userModel: "BusinessUser",
    };
    const feedback = await feedbackCreate(feedbackData);
    res.json({ status: 200, response: "Business feedback created", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const userFeedback = async(req, res, next) => {
  try {
    const { comment, rating, suggestions } = req.body;
    const feedbackData = {
      comment,
      rating,
      suggestions,
      userId: req.user._id,
      userModel: "User",
    };
    const feedback = await feedbackCreate(feedbackData);
    res.json({ status: 200, response: "User feedback created", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const AdminFeedbackView = async (req, res, next) => {
  try {
    const feedback = await allFeedbackView();
    res.json({ status: 200, response: "all  feedback ", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const AllFeedbackView = async (req, res, next) => {
  try {
    const feedback = await allFeedbackView();
    res.json({ status: 200, response: "all  feedback ", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const ActiveFeedbackView = async (req, res, next) => {
  try {
    const feedback = await allFeedbackView();
    res.json({ status: 200, response: "all feedback ", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const InActiveFeedbackView = async (req, res, next) => {
  try {
    const feedback = await allFeedbackView();
    res.json({ status: 200, response: "all  feedback ", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const SingleFeedbackViewByAdmin = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const feedback = await SingleFeedbackView(feedbackId);
    res.json({ status: 200, response: "all  feedback ", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const AdminFeedbackViewUpdate = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const { active } = req.body;
    const data = { active };
    const feedback = await FeedbackUpdate(feedbackId, data);
    res.json({ status: 200, response: "all  feedback ", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const AdminFeedbackCount = async (req, res, next) => {
  try {
    const feedback = await FeedbackCount()
    res.json({ status: 200, response: "feedback count ", feedback });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

module.exports = {
  businessFeedback,
  userFeedback,
  AdminFeedbackView,
  AllFeedbackView,
  SingleFeedbackViewByAdmin,
  AdminFeedbackViewUpdate,
  ActiveFeedbackView,
  InActiveFeedbackView,
  AdminFeedbackCount
};