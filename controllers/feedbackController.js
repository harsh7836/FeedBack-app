import Feedback from "../models/feedbackModel.js";

export const submitFeedbackController = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).send({ success: false, message: "All fields required" });
    }

    const feedback = new Feedback({ name, email, message });
    await feedback.save();

    res.status(201).send({ success: true, message: "Feedback submitted", feedback });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error", error });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).send({ success: true, feedbacks });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error", error });
  }
};
