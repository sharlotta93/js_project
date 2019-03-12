use game;
db.dropDatabase();

db.question.insertMany(
  [
    {
      answerType: "picture",
      genre: "History",
      question: "Which of these is a Greek temple?",
      image1: "https://www.ancient.eu/img/r/p/500x600/8297.jpg?v=1520937625",
      image2: "https://livitaly-666b.kxcdn.com/wp-content/uploads/2017/07/rome-colosseum-1-750x510.jpg",
      answer: "image-left",
      hint: "Ancient Greek architecture features columns."
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
    },
    {
      answerType: "multipleChoice",
      genre: "Science",
      question: "What is the planet closest to the Sun?",
      answer: "Mercury",
      choice1: "Earth",
      choice2: "Pluto",
      choice3: "Neptune",
      hint: "Pluto is a dwarf planet and Neptune is the farthest planet from the Sun."
    },
    {
      answerType: "multipleChoice",
      genre: "Science",
      question: "What is the process by which plants produce food?",
      answer: "Photosynthesis",
      choice1: "Respiration",
      choice2: "Digestion",
      choice3: "Excretion",
      hint: "Plants produce food by using sunlight, water and c02."
    },
    {
      answerType: "multipleChoice",
      genre: "Science",
      question: "Which part of the human body has the most bones?",
      answer: "Hand",
      choice1: "Foot",
      choice2: "Spine",
      choice3: "Skull",
      hint: "The skull has 22 bones, which is the least of the four."
    },
  ]
);

// other answer_type is "text"
