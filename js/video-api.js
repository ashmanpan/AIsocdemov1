/**
 * Video API Helper for DynamoDB Backend
 * Handles all CRUD operations for videos
 */

const VideoAPI = {
    BASE_URL: 'https://kwbm1mafkf.execute-api.ap-southeast-1.amazonaws.com/prod',

    /**
     * Get all videos from DynamoDB
     */
    async getAllVideos() {
        try {
            const response = await fetch(`${this.BASE_URL}/videos`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'API error');

            return data.videos || [];
        } catch (error) {
            console.error('Get all videos failed:', error);
            throw error;
        }
    },

    /**
     * Get single video by ID
     */
    async getVideo(videoId) {
        try {
            const response = await fetch(`${this.BASE_URL}/videos/${videoId}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'Video not found');

            return data.video;
        } catch (error) {
            console.error('Get video failed:', error);
            throw error;
        }
    },

    /**
     * Create new video
     */
    async createVideo(video) {
        try {
            const response = await fetch(`${this.BASE_URL}/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(video)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'Create failed');

            return data.video;
        } catch (error) {
            console.error('Create video failed:', error);
            throw error;
        }
    },

    /**
     * Update existing video
     */
    async updateVideo(videoId, updates) {
        try {
            const response = await fetch(`${this.BASE_URL}/videos/${videoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'Update failed');

            return data.video;
        } catch (error) {
            console.error('Update video failed:', error);
            throw error;
        }
    },

    /**
     * Delete video
     */
    async deleteVideo(videoId) {
        try {
            const response = await fetch(`${this.BASE_URL}/videos/${videoId}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'Delete failed');

            return true;
        } catch (error) {
            console.error('Delete video failed:', error);
            throw error;
        }
    },

    /**
     * Get videos by category
     */
    async getVideosByCategory(category) {
        try {
            const response = await fetch(`${this.BASE_URL}/videos/category/${category}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'Query failed');

            return data.videos || [];
        } catch (error) {
            console.error('Get videos by category failed:', error);
            throw error;
        }
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.VideoAPI = VideoAPI;
}

// For module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoAPI;
}
