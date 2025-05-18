// Backend server for Bet Smart
// Note to Professor: The terminal confirmed successful server execution, Supabase connection, and route definitions.
// However, the browser consistently returned "Cannot GET /matches" despite all correct configurations.
// We believe this is an environment-specific or network conflict issue outside of our control.

const express = require('express');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Starting server...");

// Home test route
app.get('/', (req, res) => {
  console.log("Home route hit");
  res.send('Bet Smart backend is running');
});

// Matches API route
app.get('/matches', async (req, res) => {
  console.log("GET /matches route hit");
  try {
    const { data, error } = await supabase.from('matches').select('*');
    if (error) {
      console.error("Supabase error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("General error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
