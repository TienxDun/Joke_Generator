#!/usr/bin/env node

// Simple build script to replace environment variables
// Usage: node build.js

const fs = require('fs');
const path = require('path');

function loadEnv() {
    const envPath = path.join(__dirname, '.env');
    if (!fs.existsSync(envPath)) {
        console.log('No .env file found, using default values');
        return {};
    }

    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};

    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            env[key.trim()] = valueParts.join('=').trim();
        }
    });

    return env;
}

function build() {
    const env = loadEnv();
    let scriptContent = fs.readFileSync('script.js', 'utf8');

    // Replace process.env variables
    Object.keys(env).forEach(key => {
        const regex = new RegExp(`process\\.env\\.${key}`, 'g');
        scriptContent = scriptContent.replace(regex, `'${env[key]}'`);
    });

    // Write to public/script.js
    if (!fs.existsSync('public')) {
        fs.mkdirSync('public');
    }

    fs.writeFileSync('public/script.js', scriptContent);
    fs.copyFileSync('index.html', 'public/index.html');
    fs.copyFileSync('style.css', 'public/style.css');

    console.log('Build completed! Files in public/ folder');
    console.log('Open public/index.html in your browser');
}

if (require.main === module) {
    build();
}