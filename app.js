const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const postsRoute = require('./routes/posts');
//const userRoute = require('./routes/user');

app.use('/posts', postsRoute);
//app.use('/user', userRoute);

app.get('/', (request, response) => {
	response.send('We are on homepage');
});

mongoose.connect(process.env.DB_CONNECTION,
 {useNewUrlParser: true,
  useUnifiedTopology: true },
);

app.listen(3000);