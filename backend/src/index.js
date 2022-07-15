const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const cors = require('cors');

mongoose
  .connect('mongodb://localhost:27017/upload', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(e, `not connected`);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use(require('./routes'));
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
4;
