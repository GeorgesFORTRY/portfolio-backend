const express = require('express');
const cors = require('cors');
const { backPort } = require('./db-config');
const skillsRouter = require('./routes/skills');
const contactRouter = require('./routes/contact');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/skills', skillsRouter);
app.use('/contact', contactRouter);

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(backPort, () => {
  console.log(`API now available on http://localhost:${backPort} !`);
});
