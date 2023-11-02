// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

// This function fetches data from the IGDB API, and takes in a params and body argument.
export async function fetchGameData(params, body) {
  try {
    const response = await fetch(`https://api.igdb.com/v4/${params}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${process.env.IGDB_TOKEN}`,
      },
      body: body,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    // if error, log error
    console.error(error + " " + params);
  }
}
