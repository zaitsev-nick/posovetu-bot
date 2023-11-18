import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  newpassword: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ],
  email_confirmation: {
    type: String,
    required: false,
  },
  reset_password_token: {
    type: String,
    required: false,
  },
  reset_password_expiration: {
    type: String,
    required: false,
  },
});

export const User = mongoose.model('User', UserSchema, 'users');
