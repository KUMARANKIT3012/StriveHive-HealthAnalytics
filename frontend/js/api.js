// API Handler for Backend Communication
class API {
    // Default BASE_URL: use localhost for local dev, otherwise use relative path so
    // the deployed frontend can call a proxied backend (if you deploy backend
    // to the same domain or add a proxy). This also allows OfflineAPI/mock
    // fallbacks to work when backend isn't reachable.
    static BASE_URL = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
        ? 'http://localhost:8081/api'
        : '/api';
    
    // Generic request handler
    static async request(endpoint, options = {}) {
        const url = `${this.BASE_URL}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        const requestOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, requestOptions);
            
            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return null;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            
            // Return mock data for development if backend is not available
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.warn('Backend not available (network error), using mock data');
                return this.getMockData(endpoint, options);
            }
            
            // Also handle HTTP 404 and 500 errors by falling back to mock data
            if (error.message.includes('HTTP error! status: 404') || 
                error.message.includes('HTTP error! status: 500') ||
                error.message.includes('HTTP error! status: 502') ||
                error.message.includes('HTTP error! status: 503')) {
                console.warn('Backend not available (HTTP error), using mock data');
                return this.getMockData(endpoint, options);
            }
            
            throw error;
        }
    }

    // Mock data for development without backend
    static getMockData(endpoint, options) {
        console.log('Using mock data for endpoint:', endpoint, 'method:', options.method || 'GET');
        
        const method = options.method || 'GET';
        const body = options.body ? JSON.parse(options.body) : null;
        
        // Handle user endpoints
        if (endpoint.startsWith('/users')) {
            if (method === 'POST') {
                // Create new user
                const newUser = {
                    id: Date.now(),
                    ...body,
                    createdDate: new Date().toISOString(),
                    updatedDate: new Date().toISOString()
                };
                console.log('Mock: Created new user:', newUser);
                return newUser;
            } else if (method === 'PUT') {
                // Update existing user
                const updatedUser = {
                    ...body,
                    updatedDate: new Date().toISOString()
                };
                console.log('Mock: Updated user:', updatedUser);
                return updatedUser;
            } else if (method === 'GET') {
                if (endpoint.includes('/users/')) {
                    // Get single user
                    return {
                        id: 1,
                        name: 'Demo User',
                        email: 'demo@strivehive.app',
                        age: 30,
                        gender: 'other',
                        height: 175,
                        weight: 70,
                        activityLevel: 'moderately_active',
                        fitnessGoal: 'maintain',
                        createdDate: new Date().toISOString()
                    };
                } else {
                    // Get all users
                    return [];
                }
            }
        }
        
        // Handle activity endpoints
        if (endpoint.startsWith('/activities')) {
            if (method === 'POST') {
                return { 
                    id: Date.now(), 
                    ...body,
                    recordedAt: new Date().toISOString() 
                };
            } else {
                return [];
            }
        }
        
        // Handle nutrition endpoints
        if (endpoint.startsWith('/nutrition')) {
            if (method === 'POST') {
                return { 
                    id: Date.now(), 
                    ...body,
                    recordedAt: new Date().toISOString() 
                };
            } else {
                return [];
            }
        }
        
        // Default fallback
        return method === 'POST' || method === 'PUT' ? { id: Date.now(), ...body } : [];
    }

    // User API methods
    static async getUsers() {
        return this.request('/users');
    }

    static async getUserById(id) {
        return this.request(`/users/${id}`);
    }

    static async getUserByEmail(email) {
        return this.request(`/users/email/${encodeURIComponent(email)}`);
    }

    static async saveUser(userData) {
        const method = userData.id ? 'PUT' : 'POST';
        const endpoint = userData.id ? `/users/${userData.id}` : '/users';
        
        return this.request(endpoint, {
            method,
            body: JSON.stringify(userData)
        });
    }

    static async deleteUser(id) {
        return this.request(`/users/${id}`, {
            method: 'DELETE'
        });
    }

    // Fitness Activity API methods
    static async getUserActivities(userId) {
        return this.request(`/activities/user/${userId}`);
    }

    static async getActivitiesForDate(userId, date) {
        return this.request(`/activities/user/${userId}/date/${date}`);
    }

    static async getActivitiesForPeriod(userId, startDate, endDate) {
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];
        return this.request(`/activities/user/${userId}/period?start=${start}&end=${end}`);
    }

    static async saveActivity(activityData) {
        const method = activityData.id ? 'PUT' : 'POST';
        const endpoint = activityData.id ? `/activities/${activityData.id}` : '/activities';
        
        return this.request(endpoint, {
            method,
            body: JSON.stringify(activityData)
        });
    }

    static async deleteActivity(id) {
        return this.request(`/activities/${id}`, {
            method: 'DELETE'
        });
    }

    // Nutrition API methods
    static async getUserNutrition(userId) {
        return this.request(`/nutrition/user/${userId}`);
    }

    static async getNutritionForDate(userId, date) {
        return this.request(`/nutrition/user/${userId}/date/${date}`);
    }

    static async getNutritionForPeriod(userId, startDate, endDate) {
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];
        return this.request(`/nutrition/user/${userId}/period?start=${start}&end=${end}`);
    }

    static async saveNutrition(nutritionData) {
        const method = nutritionData.id ? 'PUT' : 'POST';
        const endpoint = nutritionData.id ? `/nutrition/${nutritionData.id}` : '/nutrition';
        
        return this.request(endpoint, {
            method,
            body: JSON.stringify(nutritionData)
        });
    }

    static async deleteNutrition(id) {
        return this.request(`/nutrition/${id}`, {
            method: 'DELETE'
        });
    }

    // Analytics and Reports API methods
    static async getUserStats(userId, period = 'week') {
        return this.request(`/analytics/user/${userId}/stats?period=${period}`);
    }

    static async getHealthReport(userId, period = 'week') {
        return this.request(`/analytics/user/${userId}/report?period=${period}`);
    }

    static async getActivitySummary(userId, startDate, endDate) {
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];
        return this.request(`/analytics/user/${userId}/activity-summary?start=${start}&end=${end}`);
    }

    static async getNutritionSummary(userId, startDate, endDate) {
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];
        return this.request(`/analytics/user/${userId}/nutrition-summary?start=${start}&end=${end}`);
    }

    // Utility methods
    static async testConnection() {
        try {
            await this.request('/health');
            return true;
        } catch (error) {
            return false;
        }
    }

    static async getCalorieEstimate(activityType, duration, weight) {
        // Fallback calorie calculation if backend is not available
        const caloriesPerMinute = {
            'running': 10,
            'walking': 5,
            'cycling': 8,
            'swimming': 12,
            'weightlifting': 6,
            'yoga': 3,
            'cardio': 8,
            'sports': 9,
            'other': 6
        };

        const baseRate = caloriesPerMinute[activityType.toLowerCase()] || 6;
        const weightMultiplier = weight ? weight / 70 : 1; // Normalize to 70kg
        
        return Math.round(baseRate * duration * weightMultiplier);
    }

    static async getFoodNutrition(foodName) {
        // This would typically connect to a nutrition database API
        // For now, return basic estimates
        const nutritionData = {
            'apple': { calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
            'banana': { calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
            'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
            'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
            'broccoli': { calories: 25, protein: 3, carbs: 5, fat: 0.3 },
            'egg': { calories: 70, protein: 6, carbs: 0.6, fat: 5 },
            'oats': { calories: 150, protein: 5, carbs: 27, fat: 3 },
            'salmon': { calories: 200, protein: 22, carbs: 0, fat: 12 }
        };

        const food = foodName.toLowerCase();
        return nutritionData[food] || { calories: 100, protein: 5, carbs: 15, fat: 3 };
    }
}

// Enhanced Local Storage Manager for offline functionality
class LocalStorageManager {
    static KEYS = {
        USER: 'striveHiveUser',
        ACTIVITIES: 'striveHiveActivities',
        NUTRITION: 'striveHiveNutrition',
        SYNC_QUEUE: 'striveHiveSyncQueue'
    };

    static saveUser(userData) {
        localStorage.setItem(this.KEYS.USER, JSON.stringify(userData));
    }

    static getUser() {
        const userData = localStorage.getItem(this.KEYS.USER);
        return userData ? JSON.parse(userData) : null;
    }

    static saveActivities(activities) {
        localStorage.setItem(this.KEYS.ACTIVITIES, JSON.stringify(activities));
    }

    static getActivities() {
        const activities = localStorage.getItem(this.KEYS.ACTIVITIES);
        return activities ? JSON.parse(activities) : [];
    }

    static addActivity(activity) {
        const activities = this.getActivities();
        activity.id = activity.id || Date.now(); // Generate temporary ID
        activity.recordedAt = activity.recordedAt || new Date().toISOString();
        activities.unshift(activity);
        this.saveActivities(activities);
        return activity;
    }

    static saveNutrition(nutrition) {
        localStorage.setItem(this.KEYS.NUTRITION, JSON.stringify(nutrition));
    }

    static getNutrition() {
        const nutrition = localStorage.getItem(this.KEYS.NUTRITION);
        return nutrition ? JSON.parse(nutrition) : [];
    }

    static addNutrition(entry) {
        const nutrition = this.getNutrition();
        entry.id = entry.id || Date.now(); // Generate temporary ID
        entry.recordedAt = entry.recordedAt || new Date().toISOString();
        nutrition.unshift(entry);
        this.saveNutrition(nutrition);
        return entry;
    }

    static filterByDate(items, targetDate) {
        const target = new Date(targetDate).toDateString();
        return items.filter(item => {
            const itemDate = new Date(item.recordedAt).toDateString();
            return itemDate === target;
        });
    }

    static filterByPeriod(items, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return items.filter(item => {
            const itemDate = new Date(item.recordedAt);
            return itemDate >= start && itemDate <= end;
        });
    }

    static addToSyncQueue(type, action, data) {
        const queue = this.getSyncQueue();
        queue.push({
            id: Date.now(),
            type,
            action,
            data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(this.KEYS.SYNC_QUEUE, JSON.stringify(queue));
    }

    static getSyncQueue() {
        const queue = localStorage.getItem(this.KEYS.SYNC_QUEUE);
        return queue ? JSON.parse(queue) : [];
    }

    static clearSyncQueue() {
        localStorage.removeItem(this.KEYS.SYNC_QUEUE);
    }

    static async syncWithBackend() {
        const queue = this.getSyncQueue();
        if (queue.length === 0) return;

        console.log(`Syncing ${queue.length} items with backend...`);

        const failedItems = [];

        for (const item of queue) {
            try {
                switch (item.type) {
                    case 'user':
                        await API.saveUser(item.data);
                        break;
                    case 'activity':
                        await API.saveActivity(item.data);
                        break;
                    case 'nutrition':
                        await API.saveNutrition(item.data);
                        break;
                }
            } catch (error) {
                console.error(`Failed to sync item:`, item, error);
                failedItems.push(item);
            }
        }

        // Keep failed items in queue for retry
        if (failedItems.length > 0) {
            localStorage.setItem(this.KEYS.SYNC_QUEUE, JSON.stringify(failedItems));
        } else {
            this.clearSyncQueue();
        }

        console.log(`Sync completed. ${failedItems.length} items failed.`);
    }
}

// Enhanced API with offline support
class OfflineAPI extends API {
    static async saveUser(userData) {
        try {
            const result = await super.saveUser(userData);
            LocalStorageManager.saveUser(result);
            return result;
        } catch (error) {
            // Save to local storage and queue for sync
            userData.id = userData.id || Date.now();
            LocalStorageManager.saveUser(userData);
            LocalStorageManager.addToSyncQueue('user', 'save', userData);
            return userData;
        }
    }

    static async saveActivity(activityData) {
        try {
            const result = await super.saveActivity(activityData);
            return result;
        } catch (error) {
            // Save to local storage and queue for sync
            const activity = LocalStorageManager.addActivity(activityData);
            LocalStorageManager.addToSyncQueue('activity', 'save', activity);
            return activity;
        }
    }

    static async getUserActivities(userId) {
        try {
            return await super.getUserActivities(userId);
        } catch (error) {
            return LocalStorageManager.getActivities();
        }
    }

    static async getActivitiesForDate(userId, date) {
        try {
            return await super.getActivitiesForDate(userId, date);
        } catch (error) {
            const activities = LocalStorageManager.getActivities();
            return LocalStorageManager.filterByDate(activities, date);
        }
    }

    static async getActivitiesForPeriod(userId, startDate, endDate) {
        try {
            return await super.getActivitiesForPeriod(userId, startDate, endDate);
        } catch (error) {
            const activities = LocalStorageManager.getActivities();
            return LocalStorageManager.filterByPeriod(activities, startDate, endDate);
        }
    }

    static async saveNutrition(nutritionData) {
        try {
            const result = await super.saveNutrition(nutritionData);
            return result;
        } catch (error) {
            // Save to local storage and queue for sync
            const entry = LocalStorageManager.addNutrition(nutritionData);
            LocalStorageManager.addToSyncQueue('nutrition', 'save', entry);
            return entry;
        }
    }

    static async getNutritionForDate(userId, date) {
        try {
            return await super.getNutritionForDate(userId, date);
        } catch (error) {
            const nutrition = LocalStorageManager.getNutrition();
            return LocalStorageManager.filterByDate(nutrition, date);
        }
    }

    static async getNutritionForPeriod(userId, startDate, endDate) {
        try {
            return await super.getNutritionForPeriod(userId, startDate, endDate);
        } catch (error) {
            const nutrition = LocalStorageManager.getNutrition();
            return LocalStorageManager.filterByPeriod(nutrition, startDate, endDate);
        }
    }
}

// Auto-sync when online
window.addEventListener('online', async () => {
    console.log('Connection restored, syncing data...');
    try {
        await LocalStorageManager.syncWithBackend();
    } catch (error) {
        console.error('Sync failed:', error);
    }
});

// Replace API with OfflineAPI for development
window.API = OfflineAPI;
window.LocalStorageManager = LocalStorageManager;