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

export async function fetchAllUsers() {
  try {
    connectToDB();

    // finding the user by clerkId
    return await User.find();
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

export async function setRecentlyViewed({ clerkId, gameArr }) {
  try {
    connectToDB();

    const userData = await fetchUser(clerkId);
    const recentIdArr = userData.recentlyViewed.map((game) => game.id);

    const firstIndex = recentIdArr[0];

    if (recentIdArr.length > 19) {
      if (!recentIdArr.includes(gameArr?.id.toString())) {
        await User.findOneAndUpdate(
          { clerkId },
          {
            $pull: {
              recentlyViewed: {
                id: firstIndex,
              },
            },
          },
          { upsert: true }
        );
      }
    }
    if (recentIdArr.includes(gameArr?.id.toString())) {
      await User.findOneAndUpdate(
        { clerkId },
        {
          $pull: {
            recentlyViewed: {
              id: gameArr?.id,
            },
          },
        },
        { upsert: true }
      );
      await User.findOneAndUpdate(
        { clerkId },
        {
          $push: {
            recentlyViewed: {
              id: gameArr?.id,
              cover: gameArr?.cover,
              name: gameArr?.name,
              slug: gameArr?.slug,
              first_release_date: gameArr?.first_release_date,
              genres: gameArr?.genres,
              total_rating: gameArr?.total_rating,
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
            recentlyViewed: {
              id: gameArr?.id,
              cover: gameArr?.cover,
              name: gameArr?.name,
              slug: gameArr?.slug,
              first_release_date: gameArr?.first_release_date,
              genres: gameArr?.genres,
              total_rating: gameArr?.total_rating,
            },
          },
        },
        { upsert: true }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function handleFriendRequest({
  clerkId,
  targetId,
  path = "/friends",
}) {
  try {
    connectToDB();

    const userData = await fetchUser(clerkId);
    const sentRequests = userData.sentRequests.map((user) => user.clerkId);

    if (sentRequests.includes(targetId.toString())) {
      await User.findOneAndUpdate(
        { clerkId },
        {
          $pull: {
            sentRequests: {
              clerkId: targetId,
            },
          },
        },
        { upsert: true }
      );

      await User.findOneAndUpdate(
        { clerkId: targetId },
        {
          $pull: {
            receivedRequests: {
              clerkId,
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
            sentRequests: {
              clerkId: targetId,
            },
          },
        },
        { upsert: true }
      );

      await User.findOneAndUpdate(
        { clerkId: targetId },
        {
          $push: {
            receivedRequests: {
              clerkId,
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

export async function fetchFriendRequests(clerkId) {
  try {
    connectToDB();

    const userData = await fetchUser(clerkId);
    const receivedRequests = userData.receivedRequests.map(
      (user) => user.clerkId
    );

    const requests = await User.find({ clerkId: { $in: receivedRequests } });

    return requests;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchFriends(clerkId) {
  try {
    connectToDB();

    const userData = await fetchUser(clerkId);
    const friendIds = userData.friends.map((user) => user.clerkId);

    const friends = await User.find({ clerkId: { $in: friendIds } });

    return friends;
  } catch (error) {
    console.log(error.message);
  }
}

export async function acceptRequest({ clerkId, targetId, path = "/friends" }) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { clerkId },
      {
        $push: {
          friends: {
            clerkId: targetId,
          },
        },
      },
      { upsert: true }
    );

    await User.findOneAndUpdate(
      { clerkId: targetId },
      {
        $push: {
          friends: {
            clerkId,
          },
        },
      },
      { upsert: true }
    );

    await User.findOneAndUpdate(
      { clerkId },
      {
        $pull: {
          receivedRequests: {
            clerkId: targetId,
          },
        },
      },
      { upsert: true }
    );

    await User.findOneAndUpdate(
      { clerkId: targetId },
      {
        $pull: {
          sentRequests: {
            clerkId,
          },
        },
      },
      { upsert: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error.message);
  }
}

export async function declineRequest({ clerkId, targetId, path = "/friends" }) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { clerkId },
      {
        $pull: {
          receivedRequests: {
            clerkId: targetId,
          },
        },
      },
      { upsert: true }
    );

    await User.findOneAndUpdate(
      { clerkId: targetId },
      {
        $pull: {
          sentRequests: {
            clerkId,
          },
        },
      },
      { upsert: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error.message);
  }
}

export async function removeFriend({ clerkId, targetId, path = "/friends" }) {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { clerkId },
      {
        $pull: {
          friends: {
            clerkId: targetId,
          },
        },
      },
      { upsert: true }
    );

    await User.findOneAndUpdate(
      { clerkId: targetId },
      {
        $pull: {
          friends: {
            clerkId,
          },
        },
      },
      { upsert: true }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error.message);
  }
}
