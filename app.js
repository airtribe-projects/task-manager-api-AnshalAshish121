const express = require('express');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });