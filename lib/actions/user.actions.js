"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache"; // used to keep the DOM in sync with the server - instead of useState (state changes)

export async function updateUser({ clerkId, username, email, image }) {
  try {
    connectToDB(); // function written in the file mongoose.js

    // finding the user by clerkId and updating the user
    await User.findOneAndUpdate(
      { clerkId },
      {
        username,
        email,
        image,
      },
      // upsert means update and insert
      { upsert: true }
    );

    // TODO: not sure this is necessary for this functionfunction written in the file next/cache.js
  } catch (error) {
    // catching and logging any errors
    console.log(error.message);
  }
}

export async function fetchUser(clerkId) {
  try {
    connectToDB();

    // finding the user by clerkId
    return await User.findOne({ clerkId });
  } catch (error) {
    // catching and logging any errors
    console.log(error.message);
  }
}

export async function updateGenres({ clerkId, genres }) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { clerkId },
      {
        genres,
      },
      { upsert: true }
    );
  } catch (error) {
    console.log(error.message);
  }
}

export async function setOnboarded({ clerkId, onboarded }) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { clerkId },
      {
        onboarded,
      },
      { upsert: true }
    );
  } catch (error) {
    console.log(error.message);
  }
}

export async function handleSetLibrary({ clerkId, gameId, path }) {
  try {
    connectToDB();

    const userData = await fetchUser(clerkId);
    const libraryIdArray = userData.library.map((game) => game.gameId);
    const wishlistIdArray = userData.wishlist.map((game) => game.gameId);

    if (libraryIdArray.includes(gameId.toString())) {
      await User.findOneAndUpdate(
        { clerkId },
        {
          $pull: {
            library: {
              gameId,
            },
          },
        },
        { upsert: true }
      );
    } else {
      if (wishlistIdArray.includes(gameId.toString())) {
        await User.findOneAndUpdate(
          { clerkId },
          {
            $pull: {
              wishlist: {
                gameId,
              },
            },
          },
          { upsert: true }
        );
      }
      await User.findOneAndUpdate(
        { clerkId },
        {
          $push: {
            library: {
              gameId,
            },
          },
        },
        { upsert: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error.message);
  }
}

export async function handleSetWishlist({ clerkId, gameId, path }) {
  try {
    connectToDB();

    const userData = await fetchUser(clerkId);
    const wishlistIdArray = userData.wishlist.map((game) => game.gameId);

    if (wishlistIdArray.includes(gameId.toString())) {
      await User.findOneAndUpdate(
        { clerkId },
        {
          $pull: {
            wishlist: {
              gameId,
            },
          },
        },
        { upsert: true }
      );
    } else {
      await User.findOneAndUpdate(
        { clerkId },
        {
          $push: {
            wishlist: {
              gameId,
            },
          },
        },
        { upsert: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error.message);
  }
}
