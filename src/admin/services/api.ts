const API_URL = (import.meta as any).env.VITE_API_URL || 'https://golfviet-premium-backend-production.up.railway.app/api';

class ApiService {
    private async request(endpoint: string, options: RequestInit = {}) {
        const token = localStorage.getItem('isAdminAuth'); // Using simple auth check
        const headers = {
            'Content-Type': 'application/json',
            ...(token === 'true' ? { 'X-Admin-Auth': 'true' } : {}), // Simple header if needed
            ...options.headers,
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Something went wrong' }));
            throw new Error(error.error || 'Something went wrong');
        }

        return response.json();
    }

    // Courses
    async getCourses() {
        return this.request('/courses?all=true');
    }

    // Tee Time Rules
    async getRules(courseId: string) {
        return this.request(`/courses/${courseId}/rules`);
    }

    async createRule(ruleData: any) {
        return this.request('/courses/rules', {
            method: 'POST',
            body: JSON.stringify(ruleData),
        });
    }

    async updateRule(id: string, ruleData: any) {
        return this.request(`/courses/rules/${id}`, {
            method: 'PUT',
            body: JSON.stringify(ruleData),
        });
    }

    async deleteRule(id: string) {
        return this.request(`/courses/rules/${id}`, {
            method: 'DELETE',
        });
    }

    async generateInstances(data: { courseId: string; startDate: string; endDate: string }) {
        return this.request('/courses/rules/generate', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getTeeTimes(courseId: string, date: string, allStatus: boolean = false) {
        return this.request(`/courses/${courseId}/tee-times?date=${date}${allStatus ? '&all=true' : ''}`);
    }
}

export const apiService = new ApiService();
