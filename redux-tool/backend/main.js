const express = require('express');

const cors = require('cors');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/task.route');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Todoz API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});