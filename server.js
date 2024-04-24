import express from "express";
import { createApi } from "unsplash-js";
import dotenv from "dotenv";
import { APPLICATION_ID, SECRET, CALLBACK_URL } from "./config/config.js";
import axios from "axios";

dotenv.config();

if (!APPLICATION_ID || !SECRET || !CALLBACK_URL) {
  console.error("Error: Missing required environment variables.");
  process.exit(1);
}

const unsplash = createApi({
  accessKey: APPLICATION_ID,
  secret: SECRET,
  callbackUrl: CALLBACK_URL,
});

const app = express();

app.use(express.json());

// Set up CORS middleware to allow requests from all origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // You can replace "*" with specific origins if needed
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/photos", async (req, res) => {
  try {
    const { page = 1, per_page = 30 } = req.query;
    const photos = await getAllPhotos(page, per_page);
    res.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function getAllPhotos(page = 1, per_page = 30) {
  try {
    const response = await axios.get("https://api.unsplash.com/photos", {
      params: {
        page: page,
        per_page: per_page,
      },
      headers: {
        Authorization: `Client-ID ${APPLICATION_ID}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
}

const PORT = process.env.SERVER_PORT || 4100;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.SERVER_NODE_ENV} mode on port http://localhost:${PORT}`
  )
);
