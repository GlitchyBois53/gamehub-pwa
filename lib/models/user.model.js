import mongoose from "mongoose";

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
      id: { type: String, required: true },
      cover: String,
      name: String,
      slug: String,
      first_release_date: String,
      genres: [String],
      total_rating: Number,
    },
  ],

  // array of genres the user has selected
  genres: [
    {
      name: String,
      genreId: String,
    },
  ],

  // array of games the user has put on their wishlist
  wishlist: [
    {
      gameId: String,
    },
  ],

  // array of games the user has put in their library
  library: [
    {
      gameId: String,
    },
  ],

  // array of clerkId's of users the user is friends with
  friends: [
    {
      clerkId: String,
    },
  ],

  // array of clerkId's of users the user has sent friend requests to
  sentRequests: [
    {
      clerkId: String,
    },
  ],

  // array of clerkId's of users the user has received friend requests from
  receivedRequests: [
    {
      clerkId: String,
    },
  ],
});

// creating our user model
const User = mongoose.models.User || mongoose.model("User", userSchema);

// exporting our user model
export default User;
