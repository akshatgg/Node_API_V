import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env file
config({
  path: path.resolve(__dirname, "../../.env"),
});

// Create Redis client
const client = createClient({
  username: 'default',
  password: 'ZCEsBNmjnlDhQPHswpFh0iPTgy1oXYs6LLvXliPetGHjiYHVnk0w3XGthskAdfdD',
  socket: {
    host: '172.30.72.250',
    port: 6379,
  },
});

// Handling Redis events
client.on('error', (err) => console.error('Redis Client Error:', err));
client.on('connect', () => console.log('Redis connected successfully'));

// Ensure connection happens during initialization
client.connect().catch((err) => {
  console.error('Failed to connect to Redis:', err);
  process.exit(1); // Exit the process if Redis connection fails
});

// Rate-limiting middleware
const strictLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user; // Assumes authentication middleware populates `req.user`
    const { pan, aadhar, tan, gst,ifsc } = req.body;

    if (!req.url) {
      return res.status(400).json({ message: 'URL is missing.' });
    }

    if (!user) {
      return res.status(400).json({ message: 'User is missing.' });
    }

    // Determine the identifier type and value
    let identifierType: string | null = null;
    let identifierValue: string | null = null;

    if (pan) {
      identifierType = 'PAN';
      identifierValue = pan;
    } else if (aadhar) {
      identifierType = 'AADHAR';
      identifierValue = aadhar;
    } else if (tan) {
      identifierType = 'TAN';
      identifierValue = tan;
    } else if (gst) {
      identifierType = 'GST';
      identifierValue = gst;
    } else if (ifsc){
      identifierType = 'IFSC';
      identifierValue = ifsc;
    }
    else {
      return res.status(400).json({ message: 'No valid identifier provided.' });
    }

    // Get the URL and replace slashes with dashes
    const formattedUrl = req.url.replace(/\//g, '-');

    // Create a Redis key using user ID, identifier type, value, and formatted URL
    const redisKey = `${user.id}:${identifierType}:${identifierValue}:${formattedUrl}`;

    // Check if the identifier already exists in Redis
    const exists = await client.exists(redisKey);

    // If the key exists, return a 429 status code
    if (exists) {
      return res.status(429).json({
        message: `You can only check this ${identifierType} number (${identifierValue}) for ${formattedUrl} again after 3 minutes.`,
      });
    }

    // Store the identifier in Redis with a TTL of 3 minutes
    await client.set(redisKey, 'checked', {
      EX: 180, // Expiration time in seconds
    });

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Redis Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default strictLimiter;
