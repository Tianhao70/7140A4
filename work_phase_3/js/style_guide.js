// js/style_guide.js

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.style-card');

    cards.forEach(card => {
        const targetUrl = card.dataset.link; // Get URL from data-link attribute

        if (targetUrl) {
            card.addEventListener('click', (event) => {
                // Prevent default if the click was on an actual interactive element inside the card later
                if (event.target.closest('a, button')) {
                    return; 
                }
                window.location.href = targetUrl;
            });

            // Keyboard accessibility for the card itself
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    // Prevent default space bar scroll if space is used for activation
                    if (event.key === ' ') {
                        event.preventDefault();
                    }
                    // Check if the event target is not the link itself to avoid double navigation
                    if (!event.target.classList.contains('card-link')) {
                        window.location.href = targetUrl;
                    }
                }
            });
        }
    });
});