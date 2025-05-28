// js/visceral_design.js

/**
 * @fileoverview Main script for the Visceral Design page.
 * Imports and initializes modules needed for the page.
 */

// --- IMPORTS ---
// Keep track of external modules being used
import { initGalleryViewer } from './modules/viewer.js';

// --- CONSTANTS ---
// Define values that don't change e.g. page titles, URLs, etc.
// (Not used in this specific example yet)

// --- VARIABLES ---
// Define values that will change e.g. user inputs, counts, or dynamic data.
// (Not used in this specific example yet)

// --- FUNCTIONS ---
// Group code into functions to make it reusable
// (initGalleryViewer is imported, other page-specific functions could go here)

// --- EVENT LISTENERS ---
// Code that runs when a user interacts with the page

/**
 * Waits for the HTML document to be fully loaded and parsed,
 * then initializes page-specific JavaScript functionality.
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("Visceral Design page loaded. Initializing scripts...");
    // Initialize the gallery viewer functionality by calling the imported function
    initGalleryViewer();
    console.log("Gallery Viewer Initialized.");

    // You could initialize other modules or functions here if needed
});
// REMOVED extra closing brace from here