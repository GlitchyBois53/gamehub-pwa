'use server';

import User from '../models/user.model';
import { connectToDB } from '../mongoose';
import { revalidatePath } from 'next/cache'; // used to keep the DOM in sync with the server - instead of useState (state changes)

export async function updateUser({
  clerkId,
  username,
  email,
  onboarded,
  path,
}) {
  try {
    connectToDB(); // function written in the file mongoose.js

    // finding the user by clerkId and updating the user
    await User.findOneAndUpdate(
      { clerkId },
      {
        username,
        email,
        onboarded,
      },
      // upsert means update and insert
      { upsert: true }
    );

    // TODO: not sure this is necessary for this function
    revalidatePath(path); // function written in the file next/cache.js
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
