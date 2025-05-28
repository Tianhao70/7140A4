// File: deco7140_development/work_phase_3/js/reflective_design.js

import { fetchGetData } from './modules/getData.js';

// --- CONSTANTS ---
// The API endpoint for fetching community members.
// As per api.docx, page 7: https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/
const COMMUNITY_API_ENDPOINT = 'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/';
const COMMUNITY_LIST_CONTAINER_ID = 'community-list'; // The ID of the HTML container for the list

// --- ASYNCHRONOUS FUNCTION TO FETCH AND DISPLAY COMMUNITY MEMBERS ---
async function displayCommunityMembers() {
    const container = document.getElementById(COMMUNITY_LIST_CONTAINER_ID);
    if (!container) {
        console.error(`Error: Container element with ID "${COMMUNITY_LIST_CONTAINER_ID}" not found.`);
        return;
    }

    // Initial loading message
    container.innerHTML = '<p class="loading-message"><em>Loading community members...</em></p>';

 
    const headers = {
        'student_number': 's4945441', // 
        'uqcloud_zone_id': 'd691055e'  // 
    };

    try {
        const membersData = await fetchGetData(COMMUNITY_API_ENDPOINT, headers);

        // Clear loading message regardless of outcome (unless an error message replaces it)
        container.innerHTML = ''; 

        if (membersData && Array.isArray(membersData) && membersData.length > 0) {
            membersData.forEach(member => {
                const card = document.createElement('div');
                // Applying a class for styling, similar to W9.2.2 and api.docx examples
                card.className = 'community-member-card'; 
                
                let photoHTML = '';
                // API documentation (api.docx, page 11, Example Response) shows "photo": "https://yourdomain/media/community_photos/ava.jpg" or "photo": null
                if (member.photo && member.photo !== "null") { // Check for actual URL, not the string "null"
                    photoHTML = `<img src="${member.photo}" alt="Profile photo of ${member.name || 'Community Member'}" class="community-member-photo">`;
                } else {
                    // Fallback placeholder image if no photo is provided
                    photoHTML = `<img src="assets/User.png" alt="Default avatar for ${member.name || 'Community Member'}" class="community-member-photo placeholder">`;
                }

                // Building the card's inner HTML based on the structure shown in api.docx (page 5) and W9.2.2 (page 9)
                // And reflecting the example response fields (api.docx, page 11: name, email, message, photo, created_at)
                card.innerHTML = `
                    ${photoHTML}
                    <div class="community-member-info">
                        <h5 class="community-member-name">${member.name || 'Anonymous Member'}</h5>
                        <p class="community-member-message">${member.message || 'No message provided.'}</p>
                        ${member.created_at ? `<p class="community-member-joined"><small>Joined: ${new Date(member.created_at).toLocaleDateString()}</small></p>` : ''}
                        </div>
                `;
                container.appendChild(card);
            });
        } else if (membersData && Array.isArray(membersData) && membersData.length === 0) {
            // API request was successful, but no members were returned
            container.innerHTML = '<p class="info-message">No community members found yet. Be the first to share your story!</p>';
        } else {
            // fetchGetData returned null (indicating an error during fetch) or data is not in expected array format
            container.innerHTML = '<p class="error-message">Could not load community members at this time. Please try again later.</p>';
        }
    } catch (error) {
        // This catch block handles any unexpected errors within the displayCommunityMembers function itself
        console.error('Error in displayCommunityMembers function execution:', error);
        if (container) {
            container.innerHTML = '<p class="error-message">An unexpected error occurred while trying to display community members.</p>';
        }
    }
}

// --- EVENT LISTENERS ---
// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    console.log("Reflective Design page scripts initialized.");
    displayCommunityMembers(); // Fetch and display community members when the page loads
    
    // If you have other initializations for this page (e.g., accordion), they would go here.
});