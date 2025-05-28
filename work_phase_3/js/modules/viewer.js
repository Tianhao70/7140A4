// js/modules/viewer.js

/**
 * Initializes the gallery viewer functionality.
 * Adds event listeners to gallery images to open the viewer
 * and to the close button to hide the viewer.
 */
const initGalleryViewer = () => {
    // Select necessary elements from the DOM
    const viewer = document.getElementById("viewer");
    const viewerImg = document.getElementById("viewer-img");
    const viewerCaption = document.getElementById("viewer-caption");
    const closeBtn = document.getElementById("close-viewer");
    const galleryImages = document.querySelectorAll(".gallery img");

    // Check if all required elements exist before proceeding
    if (!viewer || !viewerImg || !viewerCaption || !closeBtn || galleryImages.length === 0) {
        console.error("Gallery viewer elements not found. Skipping initialization.");
        return; // Exit if essential elements are missing
    }

    // --- Event Listener for Gallery Image Clicks ---
    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            // 1. Update viewer content
            viewerImg.src = img.src;         // Set large image source
            viewerImg.alt = img.alt;         // Set large image alt text
            viewerCaption.textContent = img.alt; // Set caption text from alt

            // 2. Make viewer visible
            viewer.classList.add("open");     // Add 'open' class to trigger CSS transition
            viewer.setAttribute("aria-hidden", "false"); // Update accessibility state

            // 3. Disable body scrolling
            document.body.style.overflow = "hidden";

            // Optional: Focus the close button for better accessibility
            closeBtn.focus();
        });

        // Add keyboard accessibility to gallery images (Enter key)
        img.setAttribute('tabindex', '0'); // Make images focusable
        img.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent default space bar scroll/activation
                img.click(); // Trigger the click event handler we already defined
            }
        });
    });

    // --- Event Listener for Close Button Click ---
    closeBtn.addEventListener("click", () => {
        // 1. Hide the viewer
        viewer.classList.remove("open");   // Remove 'open' class
        viewer.setAttribute("aria-hidden", "true"); // Update accessibility state

        // 2. Restore body scrolling
        document.body.style.overflow = "auto"; // Or "visible" or "" depending on default

        // Optional: Return focus to the gallery or a relevant element later
    });

    // Optional: Add Escape key listener to close the viewer
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && viewer.classList.contains('open')) {
            closeBtn.click(); // Trigger the close button's click handler
        }
    });

}; // End of initGalleryViewer function

// Export the function to make it available for import
export { initGalleryViewer };
// REMOVED extra closing brace from here