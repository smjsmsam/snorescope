// server.js (Back-End)
require('./db_connect');  // Ensure this is required first to load the dotenv and MongoDB connection
const express = require('express');
const cors = require('cors');
const { connect, insertDay, insertNight, retrieveList } = require('./operations');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

connect().then((dbConnection) => {
  db = dbConnection;
}).catch((error) => {
  console.error('ERROR connecting to MongoDB:', error);
});

app.get('/api/retrieveData', async (req, res) => {
  try {
    const { type } = req.query;
    const data = await retrieveList(db, type);
    console.log('RETRIEVING', type);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving list' });
  }
});

app.post('/api/insertDayData', async (req, res) => {
  console.log("HIII");
  const { date, scale, datetime } = req.body; // Could simplify and combine insertion to 1 function, but for clarity left as is
  try {
    await insertDay(db, date, scale, datetime);
    console.log('DATA INSERTED BACKEND');
    res.status(201).json({ message: 'Day data inserted!' });
  } catch (error) {
    res.status(500).json({ error: 'Error inserting day data' });
  }
});

app.post('/api/insertNightData', async (req, res) => {
  console.log("HIII");
  const { date, startTime, endTime } = req.body;
  try {
    await insertNight(db, date, startTime, endTime);
    console.log('DATA INSERTED BACKEND');
    res.status(201).json({ message: 'Night data inserted!' });
  } catch (error) {
    res.status(500).json({ error: 'Error inserting night data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
//Invoke-RestMethod -Uri "http://localhost:3000/api/dayData" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"date":"2025-03-10", "scale":5, "datetime":"2025-03-10T08:00:00Z"}'
