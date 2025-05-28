// js/ethical_response.js

/**
 * IMPORTS
 */
import { initAccordion } from './modules/accordion.js';

/**
 * EVENT LISTENERS
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Ethical Response page scripts initialized.");
    
    // Initialize accordion functionality for the recommendations section
    // Assuming your accordion container within this page has the class 'accordion'
    initAccordion('.accordion'); 
});