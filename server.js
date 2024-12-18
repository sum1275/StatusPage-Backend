// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const statusRoutes = require('./routes/issueRoutes');
const connectDB = require('./dbConfig/db')
const middleware = require('./middleware/middleWare');

//note that 2 thing
//cors thik katna hai 
//get request should be socket.io if possible

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173'
  }));
  
connectDB();
// Routes
app.use('/api/status', statusRoutes);

// Error handling middleware


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});