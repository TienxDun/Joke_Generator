// --- Global Elements ---
let jokeText, punchline, jokeBtn, translateBtn, explainBtn, saveBtn, viewSavedBtn, closeSavedBtn, closeExplanationBtn, loader, explanation, explanationContent, modelSelect, bgSelect, savedJokesModal, savedList, savedCount;
let copyBtn, speakBtn, jokeDisplay;

// Store current joke data
let currentJoke = null;
let isTranslated = false;
let originalJokeText = '';
let originalPunchline = '';
let selectedModel = 'gemini-3-flash';

const API_URL = 'https://v2.jokeapi.dev/joke/Any?safe-mode=true';
const PUNCHLINE_DELAY = 500;

// Three.js Globals
let scene, camera, renderer, currentBgObjects = [], animationId, mouseX = 0, mouseY = 0;

// Initialize DOM Elements
function initElements() {
    jokeText = document.getElementById('joke-text');
    punchline = document.getElementById('punchline');
    jokeBtn = document.getElementById('get-joke-btn');
    translateBtn = document.getElementById('translate-btn');
    explainBtn = document.getElementById('explain-btn');
    closeExplanationBtn = document.getElementById('close-explanation');
    loader = document.getElementById('loader');
    explanation = document.getElementById('explanation');
    explanationContent = document.querySelector('.explanation-content');
    modelSelect = document.getElementById('model-select');
    bgSelect = document.getElementById('bg-select');
    saveBtn = document.getElementById('save-btn');
    viewSavedBtn = document.getElementById('view-saved-btn');
    closeSavedBtn = document.getElementById('close-saved-btn');
    savedJokesModal = document.getElementById('saved-jokes-modal');
    savedList = document.getElementById('saved-list');
    savedList = document.getElementById('saved-list');
    savedCount = document.getElementById('saved-count');
    copyBtn = document.getElementById('copy-btn');
    speakBtn = document.getElementById('speak-btn');
    jokeDisplay = document.querySelector('.joke-display');
}

// --- Background Clean Up ---
function clearBackground() {
    currentBgObjects.forEach(obj => {
        scene.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material.dispose();
        }
    });
    currentBgObjects = [];
}

// --- Background 1: Classic Torus Knot ---
function setTorusKnot() {
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 120, 20);
    const material = new THREE.MeshNormalMaterial({ wireframe: true, transparent: true, opacity: 0.15 });
    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);
    currentBgObjects.push(knot);
}

// --- Background 2: Neon Waves ---
function setNeonWaves() {
    const geometry = new THREE.PlaneGeometry(20, 20, 40, 40);
    const material = new THREE.MeshBasicMaterial({ color: 0x7000ff, wireframe: true, transparent: true, opacity: 0.15 });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    scene.add(plane);
    currentBgObjects.push(plane);
}

// --- Background 3: Deep Space (Particles) ---
function setDeepSpace() {
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ size: 0.03, color: 0x00c6ff, transparent: true, opacity: 0.8 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    currentBgObjects.push(points);
}

// --- Background 4: Geometric Floating ---
function setGeometric() {
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.7, 16, 16),
        new THREE.IcosahedronGeometry(0.8, 0)
    ];
    for (let i = 0; i < 15; i++) {
        const material = new THREE.MeshNormalMaterial({ wireframe: true, transparent: true, opacity: 0.2 });
        const mesh = new THREE.Mesh(geometries[Math.floor(Math.random() * geometries.length)], material);
        mesh.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10);
        mesh.userData.rotateSpeed = { x: Math.random() * 0.02, y: Math.random() * 0.02 };
        scene.add(mesh);
        currentBgObjects.push(mesh);
    }
}

// --- Background 5: Wormhole ---
function setWormhole() {
    const geometry = new THREE.TorusGeometry(5, 1.5, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xff007f, wireframe: true, transparent: true, opacity: 0.1 });
    for (let i = 0; i < 5; i++) {
        const ring = new THREE.Mesh(geometry, material);
        ring.position.z = -i * 10;
        scene.add(ring);
        currentBgObjects.push(ring);
    }
}

// --- Switch Management ---
function switchBackground(type) {
    clearBackground();
    localStorage.setItem('selectedBg', type);
    switch (type) {
        case 'torus': setTorusKnot(); break;
        case 'waves': setNeonWaves(); break;
        case 'particles': setDeepSpace(); break;
        case 'floating': setGeometric(); break;
        case 'wormhole': setWormhole(); break;
    }
}

// --- Initialization ---
function init3D() {
    const canvas = document.getElementById('canvas3d');
    if (!canvas) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Initial BG
    const savedBg = localStorage.getItem('selectedBg') || 'waves';
    bgSelect.value = savedBg;
    switchBackground(savedBg);

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / 1000;
        mouseY = (e.clientY - window.innerHeight / 2) / 1000;
        gsap.to('.main-ui', { rotationY: mouseX * 4, rotationX: -mouseY * 4, duration: 0.8 });
    });

    const clock = new THREE.Clock();

    function animate() {
        animationId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();
        const type = bgSelect.value;

        currentBgObjects.forEach((obj, i) => {
            if (type === 'torus') {
                obj.rotation.x += 0.002;
                obj.rotation.y += 0.003;
            } else if (type === 'waves') {
                const verts = obj.geometry.attributes.position.array;
                for (let j = 0; j < verts.length; j += 3) {
                    const x = verts[j];
                    const y = verts[j + 1];
                    verts[j + 2] = Math.sin(x * 0.5 + time) * 0.5 + Math.cos(y * 0.5 + time) * 0.5;
                }
                obj.geometry.attributes.position.needsUpdate = true;
            } else if (type === 'particles') {
                obj.rotation.y -= 0.0005;
                obj.rotation.x += mouseY * 0.01;
                obj.rotation.y += mouseX * 0.01;
            } else if (type === 'floating') {
                obj.rotation.x += obj.userData.rotateSpeed.x;
                obj.rotation.y += obj.userData.rotateSpeed.y;
                obj.position.y += Math.sin(time + i) * 0.005;
            } else if (type === 'wormhole') {
                obj.position.z += 0.05;
                obj.rotation.z += 0.001;
                if (obj.position.z > 5) obj.position.z = -45;
            }
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initMotion() {
    gsap.set('.main-ui', { visibility: 'visible' });
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo('.main-ui', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 })
        .fromTo('.header h1', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, "-=1")
        .fromTo('.emoji', { rotate: -180, scale: 0 }, { rotate: 0, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }, "-=0.8")
        .fromTo('.joke-btn', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, "-=1");
}

// --- Joke Fetch Logic ---
async function getJoke() {
    try {
        loader.style.display = 'block';
        jokeBtn.disabled = true;
        jokeBtn.disabled = true;
        translateBtn.style.display = 'none';
        explainBtn.style.display = 'none';
        saveBtn.style.display = 'none';
        explanation.style.display = 'none';
        jokeText.textContent = '';
        punchline.textContent = '';

        const response = await fetch(API_URL);
        const data = await response.json();

        loader.style.display = 'none';
        jokeBtn.disabled = false;
        currentJoke = data;
        isTranslated = false;

        // Save original text for translation toggling
        if (data.type === 'single') {
            originalJokeText = data.joke;
            originalPunchline = '';
        } else {
            originalJokeText = data.setup;
            originalPunchline = data.delivery;
        }

        const setJokeContent = (t1, t2) => {
            jokeText.textContent = t1;
            if (t2) {
                setTimeout(() => {
                    punchline.textContent = t2;
                    gsap.fromTo('#punchline', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                }, PUNCHLINE_DELAY);
            }
        };

        jokeDisplay.classList.add('has-joke');

        if (data.type === 'single') setJokeContent(data.joke);
        else setJokeContent(data.setup, data.delivery);

        gsap.fromTo('#joke-text', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
        translateBtn.style.display = 'flex';
        translateBtn.textContent = 'Dịch sang Tiếng Việt';
        explainBtn.style.display = 'flex';
        saveBtn.style.display = 'flex';
        saveBtn.textContent = 'Lưu';
        saveBtn.classList.remove('active-save');
        saveBtn.disabled = false;

        // Remove full-width from Saved button as it now shares space
        viewSavedBtn.classList.remove('full-width');

        // Update state based on current joke
        updateSaveButtonState();
    } catch (e) {
        loader.style.display = 'none';
        jokeBtn.disabled = false;
        jokeText.textContent = 'Lỗi kết nối. Thử lại sau nhé!';
    }
}

async function translateText(text) {
    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();
        return data[0].map(part => part[0]).join('').trim();
    } catch (e) { return text; }
}

async function translateCurrentJoke() {
    if (!currentJoke) return;
    translateBtn.disabled = true;
    const originalText = translateBtn.textContent;
    translateBtn.textContent = 'Đang dịch...';
    try {
        if (isTranslated) {
            jokeText.textContent = originalJokeText;
            punchline.textContent = originalPunchline;
            isTranslated = false;
            translateBtn.textContent = 'Dịch sang Tiếng Việt';
        } else {
            const t1 = await translateText(currentJoke.type === 'single' ? currentJoke.joke : currentJoke.setup);
            jokeText.textContent = t1;
            if (currentJoke.type === 'twopart') {
                const t2 = await translateText(currentJoke.delivery);
                punchline.textContent = t2;
            }
            isTranslated = true;
            translateBtn.textContent = 'Dịch sang Tiếng Anh';
        }
    } finally { translateBtn.disabled = false; }
}

async function explainJoke() {
    if (!currentJoke) return;
    explanation.style.display = 'block';
    explanationContent.innerHTML = 'Đang giải thích...';
    explainBtn.disabled = true;

    try {
        const jokeStr = currentJoke.type === 'single' ? currentJoke.joke : `${currentJoke.setup} ${currentJoke.delivery}`;

        const response = await fetch('/api/explain', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jokeText: jokeStr, model: selectedModel })
        });

        if (!response.ok) throw new Error('API Error');

        const data = await response.json();
        explanationContent.innerHTML = data.explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    } finally {
        explainBtn.disabled = false;
    }
}

// --- Saved Jokes Logic ---
// --- Saved Jokes Logic ---
function toggleSaveJoke() {
    if (!currentJoke) return;

    // Helper: Generate hash ID for jokes without ID
    const getHashCode = (str) => {
        let hash = 0;
        if (str.length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
            const chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    };

    // Use consistent ID generation
    const stableId = currentJoke.id || getHashCode(originalJokeText + originalPunchline);

    const jokeToToggle = {
        setup: originalJokeText,
        delivery: originalPunchline,
        type: currentJoke.type,
        id: stableId
    };

    let saved = JSON.parse(localStorage.getItem('savedJokes') || '[]');

    // Check if exists
    const index = saved.findIndex(j => j.id == stableId || (j.setup === jokeToToggle.setup && j.delivery === jokeToToggle.delivery));

    if (index !== -1) {
        // Exists -> Remove it
        saved.splice(index, 1);
        saveBtn.textContent = 'Lưu';
        saveBtn.classList.remove('active-save');
    } else {
        // Not exists -> Add it
        saved.push(jokeToToggle);
        saveBtn.textContent = 'Đã lưu ❤️';
        saveBtn.classList.add('active-save');
    }

    localStorage.setItem('savedJokes', JSON.stringify(saved));
    updateSavedCount();

    // Only re-render if modal is open to update list real-time
    if (savedJokesModal.classList.contains('active')) {
        renderSavedJokes();
    }
}

function updateSaveButtonState() {
    if (!currentJoke) return;

    const getHashCode = (str) => {
        let hash = 0;
        if (str.length === 0) return hash;
        for (let i = 0; i < str.length; i++) {
            const chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    };

    const checkId = currentJoke.id || getHashCode(originalJokeText + originalPunchline);

    const saved = JSON.parse(localStorage.getItem('savedJokes') || '[]');
    const exists = saved.some(j => j.id == checkId || (j.setup === originalJokeText && j.delivery === originalPunchline));

    if (exists) {
        saveBtn.textContent = 'Đã lưu ❤️';
        saveBtn.classList.add('active-save');
    } else {
        saveBtn.textContent = 'Lưu';
        saveBtn.classList.remove('active-save');
    }
    saveBtn.disabled = false;
}

function updateSavedCount() {
    const saved = JSON.parse(localStorage.getItem('savedJokes') || '[]');
    savedCount.textContent = saved.length;
}

function openSavedModal() {
    renderSavedJokes();
    savedJokesModal.style.display = 'flex';
    // Small delay to allow display flex to apply before opacity transition
    setTimeout(() => {
        savedJokesModal.classList.add('active');
    }, 10);
}

function closeSavedModal() {
    savedJokesModal.classList.remove('active');
    setTimeout(() => {
        savedJokesModal.style.display = 'none';
    }, 300); // Match transition duration
}

function renderSavedJokes() {
    const saved = JSON.parse(localStorage.getItem('savedJokes') || '[]');
    if (saved.length === 0) {
        savedList.innerHTML = '<p class="empty-state">Chưa lưu joke nào cả!</p>';
        return;
    }

    savedList.innerHTML = saved.map(joke => `
        <div class="saved-item">
            <button class="delete-joke-btn" onclick="deleteJoke('${joke.id}')">×</button>
            <p class="saved-setup">${joke.setup}</p>
            ${joke.delivery ? `<p>${joke.delivery}</p>` : ''}
        </div>
    `).join('');
}

// Global function for delete button in innerHTML
window.deleteJoke = function (id) {
    let saved = JSON.parse(localStorage.getItem('savedJokes') || '[]');
    saved = saved.filter(j => String(j.id) !== String(id));
    localStorage.setItem('savedJokes', JSON.stringify(saved));
    renderSavedJokes();
    updateSavedCount();
    updateSaveButtonState(); // Update main UI button if needed
};

// --- Utility Tools Logic ---
function getFullJokeText() {
    return `${jokeText.textContent}\n${punchline.textContent}`.trim();
}

async function copyJoke() {
    if (!currentJoke) return;
    try {
        await navigator.clipboard.writeText(getFullJokeText());
        const originalIcon = copyBtn.textContent;
        copyBtn.textContent = '✅';
        setTimeout(() => copyBtn.textContent = originalIcon, 2000);
    } catch (e) {
        console.error('Copy failed', e);
    }
}

function speakJoke() {
    if (!currentJoke) return;
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const text = getFullJokeText();
        const utterance = new SpeechSynthesisUtterance(text);

        // Simple language detection based on button state (naive but effective here)
        utterance.lang = isTranslated ? 'vi-VN' : 'en-US';

        // Provide visual feedback
        speakBtn.classList.add('active-tool');
        utterance.onend = () => speakBtn.classList.remove('active-tool');

        window.speechSynthesis.speak(utterance);
    } else {
        alert('Trình duyệt của bạn không hỗ trợ đọc văn bản.');
    }
}



window.addEventListener('load', () => {
    initElements();
    initMotion();

    // Load model
    const savedModel = localStorage.getItem('selectedGeminiModel');
    if (savedModel && modelSelect) {
        selectedModel = savedModel;
        modelSelect.value = savedModel;
    }

    init3D();
    updateSavedCount();

    jokeBtn.addEventListener('click', getJoke);
    translateBtn.addEventListener('click', translateCurrentJoke);
    explainBtn.addEventListener('click', explainJoke);
    saveBtn.addEventListener('click', toggleSaveJoke);
    viewSavedBtn.addEventListener('click', openSavedModal);
    closeSavedBtn.addEventListener('click', closeSavedModal);
    savedJokesModal.addEventListener('click', (e) => {
        if (e.target === savedJokesModal) closeSavedModal();
    });

    // Tools events
    copyBtn.addEventListener('click', copyJoke);
    speakBtn.addEventListener('click', speakJoke);

    closeExplanationBtn.addEventListener('click', () => explanation.style.display = 'none');
    modelSelect.addEventListener('change', (e) => {
        selectedModel = e.target.value;
        localStorage.setItem('selectedGeminiModel', selectedModel);
    });
    bgSelect.addEventListener('change', (e) => switchBackground(e.target.value));
});
