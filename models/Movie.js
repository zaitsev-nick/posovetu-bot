import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  year: String,
});

export const Movie = mongoose.model('Movie', movieSchema, 'movies');
