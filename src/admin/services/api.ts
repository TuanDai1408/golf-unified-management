const API_URL = (import.meta as any).env.VITE_API_URL || 'https://golfviet-premium-backend-production.up.railway.app/api';

class ApiService {
    async login(data: any) {
        const res = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
        }
        return res;
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const adminAuth = localStorage.getItem('isAdminAuth');
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json',
            ...(adminAuth === 'true' ? { 'X-Admin-Auth': 'true' } : {}),
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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

    async createCourse(data: any) {
        return this.request('/courses', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateCourse(id: string, data: any) {
        return this.request(`/courses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async getCourseById(id: string) {
        return this.request(`/courses/${id}`);
    }

    async deleteCourse(id: string) {
        return this.request(`/courses/${id}`, {
            method: 'DELETE',
        });
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

    // Dashboard
    async getDashboardStats(filters: any = {}) {
        const query = new URLSearchParams(filters).toString();
        return this.request(`/admin/stats${query ? `?${query}` : ''}`);
    }

    async getActivities(filters: any = {}) {
        const query = new URLSearchParams(filters).toString();
        return this.request(`/admin/activities${query ? `?${query}` : ''}`);
    }

    // Bookings
    async getBookings() {
        return this.request('/bookings/all');
    }

    async adminCreateBooking(data: any) {
        return this.request('/bookings/admin/create', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Users
    async getUsers() {
        return this.request('/auth');
    }

    async createUser(data: any) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateUser(id: string, data: any) {
        return this.request(`/auth/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteUser(id: string) {
        return this.request(`/auth/${id}`, {
            method: 'DELETE',
        });
    }

    async getStaff() {
        return this.request('/staff');
    }

    // Manager Management
    async getManagers() {
        // managers are users with role 'manager'
        const users = await this.getUsers();
        return users.filter((u: any) => u.role === 'manager');
    }

    async createManager(data: any) {
        return this.request('/managers', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getManagerAssignments(id: string) {
        return this.request(`/managers/${id}/assignments`);
    }

    async updateManagerAssignments(id: string, courseIds: string[]) {
        return this.request(`/managers/${id}/assignments`, {
            method: 'PUT',
            body: JSON.stringify({ course_ids: courseIds }),
        });
    }
}

export const apiService = new ApiService();
