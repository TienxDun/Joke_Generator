// Get elements from the DOM
const jokeText = document.getElementById('joke-text');
const punchline = document.getElementById('punchline');
const jokeBtn = document.getElementById('get-joke-btn');
const loader = document.getElementById('loader');

// JokeAPI endpoint - using v2.jokeapi.dev
const API_URL = 'https://v2.jokeapi.dev/joke/Any?safe-mode=true';
const PUNCHLINE_DELAY = 500; // Delay in ms before showing punchline

// Function to fetch a random joke
async function getJoke() {
    try {
        // Show loader and disable button
        loader.classList.add('active');
        jokeBtn.disabled = true;
        jokeText.textContent = '';
        punchline.textContent = '';

        // Fetch joke from API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const data = await response.json();

        // Hide loader and enable button
        loader.classList.remove('active');
        jokeBtn.disabled = false;

        // Display the joke based on type
        if (data.type === 'single') {
            // Single-line joke
            jokeText.textContent = data.joke;
            punchline.textContent = '';
        } else if (data.type === 'twopart') {
            // Two-part joke (setup and delivery)
            jokeText.textContent = data.setup;
            
            // Show punchline after a short delay for better effect
            setTimeout(() => {
                punchline.textContent = data.delivery;
            }, PUNCHLINE_DELAY);
        }

    } catch (error) {
        // Handle errors
        loader.classList.remove('active');
        jokeBtn.disabled = false;
        jokeText.textContent = 'Oops! Something went wrong. Please try again.';
        punchline.textContent = '';
        console.error('Error fetching joke:', error);
    }
}

// Add event listener to the button
jokeBtn.addEventListener('click', getJoke);

// Optionally, load a joke when the page first loads
// Uncomment the line below if you want an initial joke
// window.addEventListener('DOMContentLoaded', getJoke);
