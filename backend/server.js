const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
const pool = require('./db');

const app = express();
const PORT = 3000;

// Allow requests from a specific origin



app.use(express.json());
app.use(cors(
  
    {
      origin: 'http://localhost:5173',
      optionsSuccessStatus: 200,
    }
));

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});


app.use('/api/tasks', taskRoutes)



  // Connect to the database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








