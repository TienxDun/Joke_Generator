// --- Global Elements ---
let jokeText, punchline, jokeBtn, translateBtn, explainBtn, closeExplanationBtn, loader, explanation, explanationContent, modelSelect, bgSelect;

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
        translateBtn.style.display = 'none';
        explainBtn.style.display = 'none';
        explanation.style.display = 'none';
        jokeText.textContent = '';
        punchline.textContent = '';

        const response = await fetch(API_URL);
        const data = await response.json();

        loader.style.display = 'none';
        jokeBtn.disabled = false;
        currentJoke = data;
        isTranslated = false;

        const setJokeContent = (t1, t2) => {
            jokeText.textContent = t1;
            if (t2) {
                setTimeout(() => {
                    punchline.textContent = t2;
                    gsap.fromTo('#punchline', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                }, PUNCHLINE_DELAY);
            }
        };

        if (data.type === 'single') setJokeContent(data.joke);
        else setJokeContent(data.setup, data.delivery);

        gsap.fromTo('#joke-text', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
        translateBtn.style.display = 'inline-block';
        translateBtn.textContent = 'Dịch sang Tiếng Việt';
        explainBtn.style.display = 'inline-block';
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
            explainBtn.style.display = 'inline-block';
        } else {
            const t1 = await translateText(currentJoke.type === 'single' ? currentJoke.joke : currentJoke.setup);
            jokeText.textContent = t1;
            if (currentJoke.type === 'twopart') {
                const t2 = await translateText(currentJoke.delivery);
                punchline.textContent = t2;
            }
            isTranslated = true;
            translateBtn.textContent = 'Dịch sang Tiếng Anh';
            explainBtn.style.display = 'none';
        }
    } finally { translateBtn.disabled = false; }
}

async function explainJoke() {
    if (!currentJoke || isTranslated) return;
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
        gsap.from(explanation, { height: 0, opacity: 0, duration: 0.5 });
    } catch (e) {
        console.error('Explanation Error:', e);
        explanationContent.innerHTML = 'Không thể giải thích lúc này.';
    } finally {
        explainBtn.disabled = false;
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

    jokeBtn.addEventListener('click', getJoke);
    translateBtn.addEventListener('click', translateCurrentJoke);
    explainBtn.addEventListener('click', explainJoke);
    closeExplanationBtn.addEventListener('click', () => explanation.style.display = 'none');
    modelSelect.addEventListener('change', (e) => {
        selectedModel = e.target.value;
        localStorage.setItem('selectedGeminiModel', selectedModel);
    });
    bgSelect.addEventListener('change', (e) => switchBackground(e.target.value));
});
