// Get elements from the DOM
const jokeText = document.getElementById('joke-text');
const punchline = document.getElementById('punchline');
const jokeBtn = document.getElementById('get-joke-btn');
const loader = document.getElementById('loader');

// JokeAPI endpoint - using v2.jokeapi.dev
const API_URL = 'https://v2.jokeapi.dev/joke/Any?safe-mode=true';
const PUNCHLINE_DELAY = 500; // Delay in ms before showing punchline

// Function to translate text from English to Vietnamese
async function translateText(text) {
    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`);
        
        if (!response.ok) {
            throw new Error('Translation failed');
        }

        const data = await response.json();
        return data[0][0][0]; // Extract translated text
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Return original text if translation fails
    }
}

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
            const translatedJoke = await translateText(data.joke);
            jokeText.textContent = translatedJoke;
            punchline.textContent = '';
        } else if (data.type === 'twopart') {
            // Two-part joke (setup and delivery)
            const translatedSetup = await translateText(data.setup);
            jokeText.textContent = translatedSetup;
            
            // Show punchline after a short delay for better effect
            setTimeout(async () => {
                const translatedDelivery = await translateText(data.delivery);
                punchline.textContent = translatedDelivery;
            }, PUNCHLINE_DELAY);
        }

    } catch (error) {
        // Handle errors
        loader.classList.remove('active');
        jokeBtn.disabled = false;
        jokeText.textContent = 'Ối! Có lỗi xảy ra. Vui lòng thử lại.';
        punchline.textContent = '';
        console.error('Error fetching joke:', error);
    }
}

// Add event listener to the button
jokeBtn.addEventListener('click', getJoke);

// Optionally, load a joke when the page first loads
// Uncomment the line below if you want an initial joke
// window.addEventListener('DOMContentLoaded', getJoke);
