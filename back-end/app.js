require('dotenv').config() // load environmental variables from a .env file

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware setup
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Load the database models
const { Message } = require('./models/Message');
const { User } = require('./models/User');

// Route to handle fetching all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json({
      messages: messages,
      status: 'all good'
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database'
    });
  }
});

// Route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  try {
    const messages = await Message.findById(req.params.messageId);
    res.json({
      message: messages,
      status: 'all good'
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err,
      status: 'failed to retrieve message from the database'
    });
  }
});

// Route to handle saving a message
app.post('/messages/save', async (req, res) => {
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message
    });
    return res.json({
      message: message,
      status: 'all good'
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database'
    });
  }
});

// Route to provide "About Us" page content
app.get('/about', (req, res) => {
  const aboutData = {
    content: 'Hi, I am Charlotte, a senior from NYU. I love gaming, especially league of legend. My discord name is the below image lol',
    imageUrl: 'https://images4.fanpop.com/image/photos/16700000/Sponge-Bob-Square-Pants-spongebob-squarepants-16769752-440-396.jpg'  // Replace with your actual image URL
  };
  res.json(aboutData);
});

module.exports = app;
