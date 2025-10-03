/**
 * Video Storage Module
 * Handles loading and saving videos from/to server-side JSON file
 * Fallback to localStorage for offline mode
 */

const VideoStorage = {
    // Server-side JSON file (GitHub-hosted)
    SERVER_URL: 'https://raw.githubusercontent.com/ashmanpan/AIsocdemov1/main/videos-data.json',

    // LocalStorage keys for fallback/caching
    LOCAL_STORAGE_KEY: 'adminVideos',
    CACHE_TIMESTAMP_KEY: 'videosLastSync',
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

    /**
     * Load videos from server with localStorage fallback
     * @returns {Promise<Array>} Array of video objects
     */
    async loadVideos() {
        try {
            // Try to load from server
            console.log('Loading videos from server...');
            const response = await fetch(this.SERVER_URL + '?t=' + Date.now(), {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const videos = await response.json();
            console.log(`✅ Loaded ${videos.length} videos from server`);

            // Cache in localStorage
            this.cacheVideos(videos);

            return Array.isArray(videos) ? videos : [];

        } catch (error) {
            console.warn('⚠️  Failed to load from server:', error.message);
            console.log('📦 Falling back to localStorage...');

            // Fallback to localStorage
            return this.loadFromCache();
        }
    },

    /**
     * Load videos from localStorage cache
     * @returns {Array} Array of video objects
     */
    loadFromCache() {
        try {
            const cached = localStorage.getItem(this.LOCAL_STORAGE_KEY);
            if (cached) {
                const videos = JSON.parse(cached);
                console.log(`📦 Loaded ${videos.length} videos from cache`);
                return Array.isArray(videos) ? videos : [];
            }
        } catch (error) {
            console.error('Error loading from cache:', error);
        }
        return [];
    },

    /**
     * Cache videos in localStorage
     * @param {Array} videos - Array of video objects
     */
    cacheVideos(videos) {
        try {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(videos));
            localStorage.setItem(this.CACHE_TIMESTAMP_KEY, Date.now().toString());
            console.log('💾 Videos cached locally');
        } catch (error) {
            console.error('Error caching videos:', error);
        }
    },

    /**
     * Save videos to localStorage (admin only)
     * Note: To persist to server, admin must export and commit to GitHub
     * @param {Array} videos - Array of video objects
     * @returns {Object} Result object with success status
     */
    async saveVideos(videos) {
        try {
            // Validate input
            if (!Array.isArray(videos)) {
                throw new Error('Videos must be an array');
            }

            // Save to localStorage
            this.cacheVideos(videos);

            // Also save active videos for public view
            const activeVideos = videos.filter(v => v.status === 'active');
            localStorage.setItem('demoVideos', JSON.stringify(activeVideos));

            console.log(`✅ Saved ${videos.length} videos locally`);

            return {
                success: true,
                count: videos.length,
                message: 'Videos saved to browser. Export and sync to GitHub to persist across devices.'
            };

        } catch (error) {
            console.error('Error saving videos:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    /**
     * Export videos to JSON file for download
     * @param {Array} videos - Array of video objects
     * @param {string} filename - Optional filename
     */
    exportToFile(videos, filename = 'videos-data.json') {
        try {
            const dataStr = JSON.stringify(videos, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);

            console.log(`📥 Exported ${videos.length} videos to ${filename}`);
            return true;
        } catch (error) {
            console.error('Error exporting videos:', error);
            return false;
        }
    },

    /**
     * Check if cache is fresh
     * @returns {boolean} True if cache is still valid
     */
    isCacheFresh() {
        try {
            const timestamp = localStorage.getItem(this.CACHE_TIMESTAMP_KEY);
            if (!timestamp) return false;

            const age = Date.now() - parseInt(timestamp);
            return age < this.CACHE_DURATION;
        } catch (error) {
            return false;
        }
    },

    /**
     * Clear local cache
     */
    clearCache() {
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        localStorage.removeItem('demoVideos');
        localStorage.removeItem(this.CACHE_TIMESTAMP_KEY);
        console.log('🗑️  Cache cleared');
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.VideoStorage = VideoStorage;
}

// For Node.js/module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoStorage;
}
