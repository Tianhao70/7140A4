// File: js/site_map.js
import { initAccordion } from './modules/accordion.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Site Map JS Loaded");
    // Make sure '.sitemap-accordion' is the class of your main accordion <section>
    initAccordion('.sitemap-accordion'); 
});