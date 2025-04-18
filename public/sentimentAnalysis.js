const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const sortFeedback = (feedbacks) => {
  const options = {
    extras: {
      excellent: 5,
      quiet: 3,
      better: -2,
      improve: -3,
      design: 0,
      colors: 0,
      bad: 1,
    },
  };

  return feedbacks.map((feedback) => {
    const result = sentiment.analyze(feedback, options);

    const improvementKeywords = [
      "better",
      "improve",
      "could",
      "should",
      "enhance",
      "upgrade",
      "optimize",
      "refine",
      "adjust",
      "needs work",
      "could be improved",
      "should be better",
      "requires attention",
      "not ideal",
      "lacking",
      "missing",
      "falls short",
      "needs fixing",
      "recommend",
      "suggest",
      "prefer",
      "would like",
    ];
    const hasConstructiveCriticism = improvementKeywords.some((keyword) =>
      feedback.toLowerCase().includes(keyword)
    );

    return {
      text: feedback,
      score: result.score,
      sentiment:
        result.score > 0
          ? "Positive"
          : result.score < 0
          ? "Negative"
          : "Neutral",
      constructive: hasConstructiveCriticism ? "Yes" : "No",
    };
  });
};

module.exports = sortFeedback;
