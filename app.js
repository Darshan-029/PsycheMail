const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();
const sortFeedback = require("./public/sentimentAnalysis");
const cors = require("cors");
const { CohereClientV2 } = require("cohere-ai");
const Feedback = require("./models/Feedback.js");
const mongoose = require("mongoose");
const cohere = new CohereClientV2({
  token: process.env.API_KEY,
});

const app = express();
const port = 5000;

mongoose.connect("mongodb://localhost:27017/feedbackApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/analyse", (req, res) => {
  res.send(
    sortFeedback([
      "The fan was really excellent and is very quite. But i think the design and colours can be made better",
    ])
  );
});

app.get("/get-feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error retrieving feedbacks:", error);
    res.status(500).json({ error: "Failed to retrieve feedbacks" });
  }
});

app.post("/generate-mail", async (req, res) => {
  try {
    const { feedbacks } = req.body;
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "user",
          content: `Write a short email responding to the following feedback analysis: ${JSON.stringify(
            feedbacks
          )}`,
        },
      ],
    });

    const emailResponse = {
      message: response.message.content[0].text,
    };
    res.json([emailResponse]);
  } catch (error) {
    console.error("Error in /generate-mail:", error);
    res.status(500).json({ error: "Failed to generate email" });
  }
});

app.post("/analyze-feedback", (req, res) => {
  try {
    const { feedbacks } = req.body;

    let result = sortFeedback(feedbacks);
    res.json(result);
  } catch (error) {
    console.error("Error in /analyze-feedback:", error);
    res.status(500).json({ error: "Failed to analyze feedback" });
  }
});

app.post("/save-feedback", async (req, res) => {
  try {
    const { text, score, sentiment, constructive } = req.body;
    const newFeedback = new Feedback({ text, score, sentiment, constructive });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

app.post("/update-feedback-email", async (req, res) => {
  try {
    const { id, emailResponse } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { emailResponse },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Email updated successfully", updatedFeedback });
  } catch (error) {
    console.error("Error updating feedback email:", error);
    res.status(500).json({ error: "Failed to update feedback email" });
  }
});

app.delete("/delete-feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Failed to delete feedback" });
  }
});

//dashboard
app.get("/feedback-counts", async (req, res) => {
  try {
    console.log("Request received");

    const feedbacksPositive = await Feedback.find({ sentiment: "Positive" });
    const feedbacksNeutral = await Feedback.find({ sentiment: "Neutral" });
    const feedbacksNegative = await Feedback.find({ sentiment: "Negative" });

    const counts = {
      positive: feedbacksPositive.length,
      neutral: feedbacksNeutral.length,
      negative: feedbacksNegative.length,
    };

    res.status(200).json(counts);
  } catch (error) {
    console.error("Error fetching feedback counts:", error);
    res.status(500).json({ error: "Failed to fetch feedback counts" });
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
