use game;
db.dropDatabase();

db.question.insertMany(
  [
    {
      Genre: "History",
      Question: "Which of these is a Greek temple?",
      Answer: "Pantheon",
      Hint: "Ancient Greek architechture features columns."
    },
    {
      Genre: "Mathematics",
      Question: "Paul has 7 boxes of 14 balls. He lost 6 balls. How many balls does he have now?",
      Answer: 92,
      Hint: "7 x 14 = 98. Now subtract 6!"
    },
    {
      Genre: "Science",
      Question: "What is the temperature at which water boils?",
      Answer: 100,
      Hint: "0 Celsius is the temperature at which water freezes. 5600 Celsius is the temperature of the Sun."
    }
  ]
);
