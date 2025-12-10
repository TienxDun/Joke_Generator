// Get elements from the DOM
const jokeText = document.getElementById('joke-text');
const punchline = document.getElementById('punchline');
const jokeBtn = document.getElementById('get-joke-btn');
const translateBtn = document.getElementById('translate-btn');
const explainBtn = document.getElementById('explain-btn');
const closeExplanationBtn = document.getElementById('close-explanation');
const loader = document.getElementById('loader');
const explanation = document.getElementById('explanation');
const explanationContent = document.querySelector('.explanation-content');
const modelSelect = document.getElementById('model-select');

// Store current joke data
let currentJoke = null;
let isTranslated = false;
let originalJokeText = '';
let originalPunchline = '';
let selectedModel = 'gemini-2.5-flash'; // Default model

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
        // Extract all translated parts and join them
        const translatedParts = data[0].map(part => part[0]);
        return translatedParts.join('').trim();
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Return original text if translation fails
    }
}

// Function to parse basic markdown to HTML
function parseMarkdownToHTML(markdown) {
    return markdown
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
        .replace(/\n/g, '<br>'); // Line breaks
}

// Function to explain joke using backend API
async function explainJokeWithGemini(jokeText) {
    try {
        const response = await fetch('http://localhost:3000/api/explain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jokeText, model: selectedModel })
        });

        if (!response.ok) {
            throw new Error('API failed');
        }

        const data = await response.json();
        return parseMarkdownToHTML(data.explanation);
    } catch (error) {
        console.error('Explanation error:', error);
        return 'Không thể giải thích joke này lúc này. Vui lòng thử lại sau.';
    }
}

// Function to fetch a random joke
async function getJoke() {
    try {
        // Show loader and disable button
        loader.classList.add('active');
        jokeBtn.disabled = true;
        translateBtn.style.display = 'none';
        explainBtn.style.display = 'none';
        explanation.style.display = 'none';
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
        explainBtn.style.display = 'inline-block';

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
            explainBtn.style.display = 'inline-block';
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
            explainBtn.style.display = 'none';
        }
    } catch (error) {
        console.error('Translation error:', error);
    } finally {
        translateBtn.disabled = false;
    }
}

// Function to explain the current joke
async function explainJoke() {
    if (!currentJoke || isTranslated) return;

    explanation.style.display = 'block';
    explanationContent.innerHTML = 'Đang giải thích...';
    explainBtn.disabled = true;

    try {
        let jokeToExplain = '';
        if (currentJoke.type === 'single') {
            jokeToExplain = currentJoke.joke;
        } else if (currentJoke.type === 'twopart') {
            jokeToExplain = `${currentJoke.setup} ${currentJoke.delivery}`;
        }

        const aiExplanation = await explainJokeWithGemini(jokeToExplain);
        explanationContent.innerHTML = aiExplanation;
    } catch (error) {
        explanationContent.innerHTML = 'Không thể giải thích joke này lúc này. Vui lòng thử lại sau.';
    } finally {
        explainBtn.disabled = false;
    }
}

// Function to save model selection to localStorage
function saveModelSelection() {
    localStorage.setItem('selectedGeminiModel', selectedModel);
}

// Function to load model selection from localStorage
function loadModelSelection() {
    const savedModel = localStorage.getItem('selectedGeminiModel');
    if (savedModel) {
        selectedModel = savedModel;
        modelSelect.value = savedModel;
    }
}

// Function to handle model selection change
function handleModelChange(event) {
    selectedModel = event.target.value;
    saveModelSelection();
}

// Function to close explanation
function closeExplanation() {
    explanation.style.display = 'none';
}

// Add event listener to the button
jokeBtn.addEventListener('click', getJoke);
translateBtn.addEventListener('click', translateCurrentJoke);
explainBtn.addEventListener('click', explainJoke);
closeExplanationBtn.addEventListener('click', closeExplanation);
modelSelect.addEventListener('change', handleModelChange);

// Load saved model selection on page load
window.addEventListener('DOMContentLoaded', loadModelSelection);
// window.addEventListener('DOMContentLoaded', getJoke);
