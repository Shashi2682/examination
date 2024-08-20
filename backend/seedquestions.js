const mongoose = require('mongoose');
const Question = require('./models/Question'); // Adjust path if necessary
const dbConfig = require('./config/db'); // Adjust path if necessary

mongoose.connect(dbConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const seedQuestions = async () => {
  try {
    const questions = [
      { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
      { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' }
    ];

    await Question.insertMany(questions);
    console.log('Questions seeded successfully');
  } catch (error) {
    console.error('Error seeding questions:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedQuestions();
