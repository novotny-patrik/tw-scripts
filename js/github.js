// ==UserScript==
// @name         TW bot 7
// @namespace    http://tampermonkey.net/
// @version      2024-04-21
// @description  tribal wars bot
// @author       LZ
// @match        https://greasyfork.org/en
// @match        *://*.divokekmeny.cz/*
// @grant        none
// @license      MIT
// ==/UserScript==

let reloadCountdown = 10 * 60; // 10 minutes
let reloadCountdownInterval = setInterval(() => {
    //console.log(reloadIntervalInSecs + ' seconds until reload...');
    reloadCountdown--;
    console.log('Reloading page in ' + reloadCountdown + ' sec.');
    if (reloadCountdown < 0) {
        clearInterval(reloadCountdownInterval);
        console.log('Reloading page...');
        window.location.reload();
    }
}, 1000);

async function loadAndExecuteScript(apiUrl) {
    try {
        // Fetch the file content from GitHub API
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch script: ' + response.statusText);

        // Parse the JSON response
        const jsonData = await response.json();

        // Decode the base64 content to plain text if it exists
        const scriptContent = jsonData.content ? atob(jsonData.content.replace(/\n/g, '')) : '';

        // Create a new script element
        const scriptElement = document.createElement('script');
        scriptElement.textContent = scriptContent;

        // Append the script element to the document to execute it
        document.body.appendChild(scriptElement);
        console.log('Script loaded and executed successfully.');
    } catch (error) {
        console.error('Error loading or executing script:', error);
    }
}

// GitHub API endpoint for the specific JavaScript file
const gitHubApiUrl = 'https://api.github.com/repos/novotny-patrik/tw-scripts/contents/js/twb.js';

// Call the function with the GitHub API URL
loadAndExecuteScript(gitHubApiUrl);