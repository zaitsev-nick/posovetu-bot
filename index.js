import dotenv from 'dotenv';
import { BOT, initializeBot } from './controllers/initBot.js';
import { connectMongoDB } from './controllers/db.js';
import { listenBot } from './server.js';
import { runBot } from './bot/main.js';

(async () => {
  try {
    dotenv.config();
    await initializeBot();
    connectMongoDB();
    listenBot(BOT);
    runBot(BOT);
  } catch (error) {
    console.error(error);
  }
})();
