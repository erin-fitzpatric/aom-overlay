import express from 'express';
import cors from 'cors';
import path from 'path';
import fetch from 'node-fetch'; // Only required if using Node.js < 18
import { fileURLToPath } from 'url'; // Required to handle __dirname in ES modules

const app = express();
const PORT = 8080;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Apply CORS middleware globally
app.use(cors({
  origin: 'http://localhost:8000',
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch leaderboard data
app.get('/api/leaderboard', async (req, res) => {
  try {
    const response = await fetch(
      'https://athens-live-api.worldsedgelink.com/community/leaderboard/GetPersonalStat?title=athens&aliases=[FitzBro]'
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
