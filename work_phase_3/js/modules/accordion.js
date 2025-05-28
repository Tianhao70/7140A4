// js/modules/accordion.js
/**
 * Initializes accordion functionality for all accordion containers matching the selector.
 * Handles nested accordions and dynamic content height for smooth animations.
 * @param {string} containerSelector - CSS selector for the main accordion container(s).
 */
function initAccordion(containerSelector) {
    const accordionContainers = document.querySelectorAll(containerSelector);

    accordionContainers.forEach((container) => {
        const headers = container.querySelectorAll(".accordion-header");

        headers.forEach((header) => {
            const item = header.closest(".accordion-item");
            if (!item) {
                // console.warn("Accordion header found without a parent .accordion-item:", header);
                return;
            }

            const content = item.querySelector(".accordion-content");
            if (!content) {
                // console.warn("Accordion item found without a .accordion-content child:", item);
                return;
            }

            // Initialize based on current state for page load
            if (item.classList.contains("open")) {
                // Set to scrollHeight on load if already open
                // Use a slight delay to ensure accurate scrollHeight calculation after styles apply
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + "px";
                });
            } else {
                content.style.maxHeight = "0";
            }

            header.addEventListener("click", () => {
                const currentlyOpen = item.classList.contains("open");

                if (currentlyOpen) {
                    // Closing: Set to current scrollHeight just before animating to 0
                    // This ensures the animation starts from the correct height if it was 'none' or changed
                    content.style.maxHeight = content.scrollHeight + "px";
                    requestAnimationFrame(() => { // Next frame, animate to 0
                        content.style.maxHeight = "0";
                        item.classList.remove("open");
                    });
                } else {
                    // Opening: Add class, then set max-height to scrollHeight
                    item.classList.add("open");
                    content.style.maxHeight = content.scrollHeight + "px";

                    // Optional: If content inside might resize AFTER opening (e.g., images load slowly),
                    // you might set maxHeight to 'auto' or 'none' after the transition ends.
                    // However, this can make closing animations tricky if not reset properly.
                    // For now, this should handle most cases.
                    // If deeply nested accordions cause issues, this 'transitionend' logic might be needed.
                    // content.addEventListener('transitionend', function onOpenTransitionEnd() {
                    //     if (item.classList.contains("open")) {
                    //         // content.style.maxHeight = 'none'; // Or a very large fixed value if 'none' breaks animations
                    //     }
                    //     content.removeEventListener('transitionend', onOpenTransitionEnd);
                    // });
                }

                // Adjust height of all open parent accordions iteratively
                // This is crucial for nested accordions
                let parentAccordionItem = item.parentElement?.closest(".accordion-item.open");
                while (parentAccordionItem) {
                    const parentAccordionContent = parentAccordionItem.querySelector(".accordion-content");
                    if (parentAccordionContent) {
                        // Ensure parent has 'open' class before adjusting its height
                        if (parentAccordionItem.classList.contains("open")) {
                             requestAnimationFrame(() => { // Use rAF for timing
                                parentAccordionContent.style.maxHeight = parentAccordionContent.scrollHeight + "px";
                            });
                        }
                    }
                    parentAccordionItem = parentAccordionItem.parentElement?.closest(".accordion-item.open");
                }
            });
        });
    });
}

export { initAccordion };