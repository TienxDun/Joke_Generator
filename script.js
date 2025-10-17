// Get elements from the DOM
const jokeText = document.getElementById('joke-text');
const punchline = document.getElementById('punchline');
const jokeBtn = document.getElementById('get-joke-btn');
const translateBtn = document.getElementById('translate-btn');
const loader = document.getElementById('loader');

// Store current joke data
let currentJoke = null;
let isTranslated = false;
let originalJokeText = '';
let originalPunchline = '';

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
        translateBtn.style.display = 'none';
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

        // Store current joke data
        currentJoke = data;
        isTranslated = false;

        // Display the joke based on type (original English)
        if (data.type === 'single') {
            // Single-line joke
            originalJokeText = data.joke;
            jokeText.textContent = data.joke;
            punchline.textContent = '';
            originalPunchline = '';
        } else if (data.type === 'twopart') {
            // Two-part joke (setup and delivery)
            originalJokeText = data.setup;
            originalPunchline = data.delivery;
            jokeText.textContent = data.setup;
            
            // Show punchline after a short delay for better effect
            setTimeout(() => {
                punchline.textContent = data.delivery;
            }, PUNCHLINE_DELAY);
        }

        // Show translate button
        translateBtn.style.display = 'inline-block';
        translateBtn.textContent = 'Dịch sang Tiếng Việt';

    } catch (error) {
        // Handle errors
        loader.classList.remove('active');
        jokeBtn.disabled = false;
        jokeText.textContent = 'Ối! Có lỗi xảy ra. Vui lòng thử lại.';
        punchline.textContent = '';
        translateBtn.style.display = 'none';
        console.error('Error fetching joke:', error);
    }
}

// Function to translate the current joke
async function translateCurrentJoke() {
    if (!currentJoke) return;

    translateBtn.disabled = true;
    translateBtn.textContent = 'Đang dịch...';

    try {
        if (isTranslated) {
            // Translate back to English
            jokeText.textContent = originalJokeText;
            punchline.textContent = originalPunchline;
            isTranslated = false;
            translateBtn.textContent = 'Dịch sang Tiếng Việt';
        } else {
            // Translate to Vietnamese
            if (currentJoke.type === 'single') {
                const translatedJoke = await translateText(currentJoke.joke);
                jokeText.textContent = translatedJoke;
            } else if (currentJoke.type === 'twopart') {
                const translatedSetup = await translateText(currentJoke.setup);
                jokeText.textContent = translatedSetup;
                
                setTimeout(async () => {
                    const translatedDelivery = await translateText(currentJoke.delivery);
                    punchline.textContent = translatedDelivery;
                }, PUNCHLINE_DELAY);
            }
            isTranslated = true;
            translateBtn.textContent = 'Dịch sang Tiếng Anh';
        }
    } catch (error) {
        console.error('Translation error:', error);
    } finally {
        translateBtn.disabled = false;
    }
}

// Add event listener to the button
jokeBtn.addEventListener('click', getJoke);
translateBtn.addEventListener('click', translateCurrentJoke);

// Optionally, load a joke when the page first loads
// Uncomment the line below if you want an initial joke
// window.addEventListener('DOMContentLoaded', getJoke);
