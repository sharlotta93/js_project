use game;
db.dropDatabase();

db.question.insertMany(
  [
    {
      answerType: "picture",
      genre: "History",
      question: "Which of these is a Greek temple?",
      image1: "url",
      image2: "url",
      answer: "image-left",
      hint: "Ancient Greek architechture features columns."
    },
    {
      answerType: "number",
      genre: "Mathematics",
      question: "Paul has 7 boxes of 14 balls. He lost 6 balls. How many balls does he have now?",
      answer: 92,
      hint: "7 x 14 = 98. Now subtract 6!"
    },
    {
      answerType: "multipleChoice",
      genre: "Science",
      question: "What is the temperature at which water boils?",
      answer: 100,
      choice1: 10,
      choice2: 5600,
      choice3: 0,
      hint: "0 Celsius is the temperature at which water freezes. 5600 Celsius is the temperature of the Sun."
    }
  ]
);

// other answer_type is "text"
