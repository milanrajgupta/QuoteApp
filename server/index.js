const express = require('express');

const cookieParser = require('cookie-parser');
require('dotenv').config();

const cors = require('cors');
const axios = require('axios');
const connectDB=require("./config/database")
const userRoutes=require("./routes/User")
const quoteRoutes=require("./routes/Quote")
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors());
app.use(cookieParser());

connectDB();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/quotes');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});


app.use("/api/auth",userRoutes);
app.use("/quote",quoteRoutes);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running baby....'
	});
});

app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
