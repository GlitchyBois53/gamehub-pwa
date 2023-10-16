// function to fetch data from IGDB API

export async function fetchGameData(params, body) {
  // fetch data from IGDB API based on params and body
  const response = await fetch(`https://api.igdb.com/v4/${params}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': process.env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${process.env.IGDB_TOKEN}`,
    },
    body: body,
  });

  // throw error if response is not ok
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // return data
  const data = await response.json();
  return data;
}
