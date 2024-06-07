const express = require('express');

const cookieParser = require('cookie-parser');
require('dotenv').config();

const cors = require('cors');
const axios = require('axios');
const connectDB=require("./config/database")
const userRoutes=require("./routes/User")
const quoteRoutes=require("./routes/Quote")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use(cookieParser());
const corsOptions = {
  origin: 'https://techplement-beige.vercel.app',
  credentials: true 
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://techplement-beige.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
