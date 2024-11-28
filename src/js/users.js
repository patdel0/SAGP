/**
 * Helper function to perform a fetch request and parse the JSON response.
 * 
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {Object} [options={}] - Optional fetch options like method, headers, and body.
 * @returns {Promise<Object>} - The parsed JSON response.
 * @throws {Error} - If the request fails or the response is not OK.
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers }
    });

    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  } catch (error) {
    console.log('Error:', error);
  }
}

/**
 * Fetches the list of users from the collection.
 * 
 * @returns {Promise<Object>} - An object representing the list of users.
 * @throws {Error} - If the request to fetch users fails.
 */
export async function fetchUsers() {
  const endpoint = `https://getpantry.cloud/apiv1/pantry/${import.meta.env.VITE_API_KEY}/basket/users`;
  return await apiRequest(endpoint);
}

/**
 * Adds a new user to the collection by appending their data to the user list.
 * The user is stored as an object in the format: `{ index: userData }`,
 * where `index` is the current number of users + 1, and `userData` is the input object.
 * 
 * @param {Object} userData - An object containing the user's details (e.g., name, email).
 * @returns {Promise<Object>} - The API response after the user is successfully added.
 * @throws {Error} - If the request to add the user fails.
 */
export async function createUser(userData) {
  const users = await fetchUsers();
  const userCount = Object.keys(users).length;
  const endpoint = `https://getpantry.cloud/apiv1/pantry/${import.meta.env.VITE_API_KEY}/basket/users`;

  return await apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify({ [userCount]: userData })
  });
}

