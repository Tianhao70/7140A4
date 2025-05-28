// File: deco7140_development/work_phase_3/js/modules/getData.js

/**
 * Reusable JavaScript function to retrieve information from an API using a GET request.
 * @param {string} url - The full web address (endpoint) of the API.
 * @param {object} headers - Optional: Any extra headers to send with the request.
 * @returns {Promise<object|null>} - A promise that resolves with the JSON data from the API, or null if an error occurs.
 */
const fetchGetData = async (url, headers = {}) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            // If the HTTP response status is not OK (e.g., 404, 500), throw an error.
            // This will be caught by the catch block.
            throw new Error(`Server returned an error. Status: ${response.status}`);
        }
        // If response is OK, parse it as JSON.
        const data = await response.json();
        return data;
    } catch (error) {
        // Log any errors that occur during the fetch operation or JSON parsing.
        console.error('Error fetching data:', error);
        // Return null to indicate that the request failed.
        // The calling function should check for null and handle the error appropriately (e.g., display a message to the user).
        return null;
    }
};

// Export the function so it can be imported and used in other JavaScript files.
export { fetchGetData };