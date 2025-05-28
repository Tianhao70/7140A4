/**
 * IMPORTS
 * Keep track of external modules being used
 */
import { logMessage } from "./modules/logging.js";
import { fetchTemperature } from "./modules/temperature.js";
/**
 * CONSTANTS
 * Define values that don't change e.g. page titles, URLs, etc.
 */
// [source: 68]
const PAGE_NAME = "component.js";
/**
 * VARIABLES
 * Define values that will change e.g. user inputs, counters, etc.
 */
// [source: 69]
let message = "Page has fully loaded";
/**
 * FUNCTIONS
 * Group code into functions to make it reusable
 */

/**
 * EVENT LISTENERS
 * The code that runs when a user interacts with the page
 */
window.addEventListener("load", function () {
    logMessage(PAGE_NAME, message);
    fetchTemperature();
});
