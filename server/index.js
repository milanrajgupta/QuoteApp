const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/quotes', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/quotes');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
