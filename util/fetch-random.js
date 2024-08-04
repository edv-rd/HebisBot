// Function to get the friendly name
async function fetchRandom(category) {
  const fetch = (await import("node-fetch")).default;

  // console.log(`Fetching ${category}`);

  const response = await fetch(
    `https://hebisapi.onrender.com/random?category=${category}`
  );

  const data = await response.json();

  const fetchedEntry = data.response.entry[0].entry; // Access the "entry" property

  // console.log(`Recieved ${fetchedEntry}`);
  return fetchedEntry;
}

// Export the function to be used in other files
module.exports = fetchRandom;
