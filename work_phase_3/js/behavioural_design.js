// File: js/behavioural_design.js

/**
 * @fileoverview Main script for the Behavioural Design page.
 * Handles interactive components specific to this page, primarily form submission
 * to the DECO7140 Community API endpoint.
 */

// --- CONSTANTS ---
const EXAMPLE_FORM_ID = '#example-form';
// Actual Community API endpoint URL from api.docx
const FORM_SUBMIT_ENDPOINT = 'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/'; // <-- Updated Endpoint

// --- FUNCTIONS ---

/**
 * Handles the submission of the example form to the Community API.
 */
async function handleExampleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const statusMessageElement = document.getElementById('form-status-message');

    // Clear previous status messages and classes
    if (statusMessageElement) {
        statusMessageElement.textContent = '';
        statusMessageElement.className = 'mt-3'; // Reset classes
        statusMessageElement.style.display = 'none';
    }

    // Basic HTML5 validation check
    if (!form.checkValidity()) {
        console.warn('Form validation failed. Please check fields.');
        if (statusMessageElement) {
            statusMessageElement.textContent = 'Please fill in all required fields correctly.';
            statusMessageElement.classList.add('error');
            statusMessageElement.style.display = 'block';
        }
        form.reportValidity(); // Show browser validation bubbles
        return;
    }

    // Disable submit button and show submitting message
    if (submitButton) submitButton.disabled = true;
    if (statusMessageElement) {
        statusMessageElement.textContent = 'Submitting...';
        statusMessageElement.className = 'mt-3';
        statusMessageElement.style.display = 'block';
    }

    // Gather form data - FormData handles multipart/form-data automatically
    const formData = new FormData(form);

    // !!! IMPORTANT: Replace placeholders with your actual Student Number and UQ Cloud Zone ID !!!
    const headers = {
        'student_number': 's4945441', // <-- Replace with your sXXXXXXX
        'uqcloud_zone_id': 'd691055e'     // <-- Replace with YOUR zone ID if different
    };
    // console.log('Submitting to:', FORM_SUBMIT_ENDPOINT); // Debug URL
    // console.log('Using Headers:', headers); // Debug headers
    // console.log('Form Data:', formData); // Debug FormData (won't show files easily)


    try {
        // Send data using fetch POST
        const response = await fetch(FORM_SUBMIT_ENDPOINT, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        let responseData = {};
        try {
            // Try to parse JSON, works for success and expected errors
            responseData = await response.json();
           // console.log('API Response Data:', responseData);
        } catch (jsonError) {
            // Handle cases where response isn't JSON (e.g., 500 server error page)
            console.error('Error parsing JSON response:', jsonError);
             if (!response.ok && statusMessageElement) { // Show generic error if parsing failed on bad response
                statusMessageElement.textContent = `Submission failed. Server error (Status: ${response.status}). Please try again later.`;
                 statusMessageElement.className = 'mt-3 error'; // Add error class
                statusMessageElement.style.display = 'block';
            } else if (statusMessageElement) {
                 // If parsing failed even on ok response? Unlikely but possible.
                statusMessageElement.textContent = `Submission successful, but response could not be processed.`;
                 statusMessageElement.className = 'mt-3 warning'; // Use a warning style?
                statusMessageElement.style.display = 'block';
            }
            // Exit the try block for fetch if JSON parsing failed
            return;
        }

        // Check if the API indicated success (response.ok checks for 2xx status codes)
        if (response.ok) {
            console.log('Form submitted successfully via API.');
            if (statusMessageElement) {
                // Use message from API response (as seen in api.docx success example)
                statusMessageElement.textContent = responseData.message || 'Success! Form submitted.';
                statusMessageElement.className = 'mt-3 success'; // Add success class
            }
            form.reset(); // Clear the form on success
        } else {
            // Handle API-level errors (e.g., duplicate email, validation failure on server)
            console.error(`API Error: ${response.status}`, responseData);
            if (statusMessageElement) {
                 // Use detailed error message from API response (as seen in api.docx error example)
                statusMessageElement.textContent = `Submission failed: ${responseData.message || `Server responded with status ${response.status}`}.`;
                 statusMessageElement.className = 'mt-3 error'; // Add error class
            }
        }
    } catch (error) {
        // Handle network errors (fetch itself failed)
        console.error('Network error during form submission:', error);
        if (statusMessageElement) {
            statusMessageElement.textContent = 'Submission failed due to a network error. Please check your connection and try again.';
            statusMessageElement.className = 'mt-3 error';
        }
    } finally {
        // Re-enable the submit button
        if (submitButton) submitButton.disabled = false;
        // Ensure the status message remains visible after processing
        if (statusMessageElement) statusMessageElement.style.display = 'block';
    }
}


// --- EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    console.log("Behavioural Design page loaded. Initializing scripts...");

    const exampleForm = document.querySelector(EXAMPLE_FORM_ID);

    if (exampleForm) {
        exampleForm.addEventListener('submit', handleExampleFormSubmit);
        console.log(`Submit listener added to form ${EXAMPLE_FORM_ID}`);
    } else {
        console.warn(`Example form with ID ${EXAMPLE_FORM_ID} not found.`);
    }

    console.log("Behavioural Design scripts initialized.");
});