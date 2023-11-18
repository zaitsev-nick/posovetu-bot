import mongoose from 'mongoose';

// DB connection
const connectMongoDB = () => {
  try {
    mongoose.connect(
      `mongodb+srv://nickzcv:qnossbMcE3RaPqKd@cluster0.9nzo3.mongodb.net/Posovetu?retryWrites=true&w=majority`
    );
    const db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  } catch (err) {
    console.log('DB connection fails:', err);
  }
};

export { connectMongoDB };
