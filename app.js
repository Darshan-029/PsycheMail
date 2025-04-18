const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();
const sortFeedback = require("./public/sentimentAnalysis");
const cors = require("cors");
const { CohereClientV2 } = require("cohere-ai");
const cohere = new CohereClientV2({
  token: "22MznrbdTU2k2xTExNR7IcvSb4XmRPOXPDNlc9Tu",
});

const app = express();
const port = 5000;

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

app.post("/generate-mail", async (req, res) => {
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
});

app.post("/analyze-feedback", (req, res) => {
  const { feedbacks } = req.body;
  let result = sortFeedback(feedbacks);
  res.json(result);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
