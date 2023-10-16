import mongoose from 'mongoose';

// setting our user schema
const userSchema = new mongoose.Schema({
  // to identify the user from Clerk
  clerkId: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  image: String,

  // to check if the user has been onboarded
  onboarded: { type: Boolean, default: false },

  // array of games the user has recently viewed
  recentlyViewed: [
    {
      // TODO could be a number, but we'll use a string for now
      gameId: String,
    },
  ],

  // array of genres the user has selected
  genres: [
    {
      name: String,
      // TODO could be a number, but we'll use a string for now
      genreId: String,
    },
  ],

  // array of games the user has put on their wishlist
  wishlist: [
    {
      // TODO could be a number, but we'll use a string for now
      gameId: String,
    },
  ],

  // array of games the user has put in their library
  library: [
    {
      // TODO could be a number, but we'll use a string for now
      gameId: String,
    },
  ],

  // array of _id's of users the user is friends with
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  // array of _id's of users the user has recieved friend requests from
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// creating our user model
const User = mongoose.models.User || mongoose.model('User', userSchema);

// exporting our user model
export default User;
