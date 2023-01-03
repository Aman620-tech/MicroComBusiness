const Feedback = require("./feedback.model");

const feedbackCreate = async (feedbackData) => {
  const feedback = await Feedback.create(feedbackData);
  return feedback;
};

const allFeedbackView = async () => {
  const feedback = await Feedback.find().populate("userId", "name profilePicture ")
  return feedback;
};

const SingleFeedbackView = async (feedbackId) => {
  const feedback = await Feedback.findById(feedbackId);
  return feedback;
};

const FeedbackUpdate = async (feedbackId, data) => {
  await Feedback.findByIdAndUpdate(feedbackId, { set: data });
  const feedback = await SingleFeedbackView(feedbackId);
  return feedback;
};

const FeedbackCount = async () => {
  const feedback = await Feedback.countDocuments();
  return feedback;
};

module.exports = {
  feedbackCreate,
  FeedbackCount,
  FeedbackUpdate,
  allFeedbackView,
  SingleFeedbackView,
};
