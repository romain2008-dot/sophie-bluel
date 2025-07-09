// Configuration de l'API
// Détection automatique de l'environnement
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Configuration selon l'environnement
const API_BASE_URL = isLocalhost 
    ? "http://localhost:5678"  // Développement local
    : "https://sophie-bluel-4uiy.onrender.com";  // Production

console.log(`API configurée pour: ${API_BASE_URL}`);

export { API_BASE_URL };