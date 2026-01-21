const CACHE_NAME = "manthan-portfolio-v1";

// CRITICAL: Only cache files that actually exist in your project folder or HTML.
// If any file in this list is missing, the Service Worker will fail to install.
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./Gemini_Generated_Image_l7zhtgl7zhtgl7zh.png", /* App Icon */
    
    // External CSS used in your HTML
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
];

// 1. Install Event: Cache the files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Fetch Event: Serve from Cache if offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached file if found, otherwise fetch from network
            return response || fetch(event.request);
        })
    );
});

// 3. Activate Event: Clean up old caches
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
