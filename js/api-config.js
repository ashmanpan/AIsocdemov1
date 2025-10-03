/**
 * API Configuration for CiscoAI Videos
 * DynamoDB + Lambda Backend
 */

const API_CONFIG = {
    BASE_URL: 'https://kwbm1mafkf.execute-api.ap-southeast-1.amazonaws.com/prod',
    ENDPOINTS: {
        VIDEOS: '/videos',
        VIDEO_BY_ID: (id) => `/videos/${id}`,
        VIDEOS_BY_CATEGORY: (category) => `/videos/category/${category}`
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
}

// For module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
