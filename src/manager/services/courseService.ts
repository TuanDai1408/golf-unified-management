import { supabase } from '../../shared/supabase';

const API_URL = (import.meta as any).env.VITE_API_URL || 'https://golfviet-premium-backend-production.up.railway.app/api';

export const uploadCourseImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `course-images/${fileName}`;

    const { data, error } = await supabase.storage
        .from('golf-images')
        .upload(filePath, file);

    if (error) {
        throw new Error(`Error uploading image: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from('golf-images')
        .getPublicUrl(filePath);

    return publicUrl;
};

export const uploadCourseImages = async (files: File[]) => {
    const uploadPromises = files.map(file => uploadCourseImage(file));
    return Promise.all(uploadPromises);
};


export const createCourse = async (courseData: any) => {
    const response = await fetch(`${API_URL}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create course');
    }

    return response.json();
};

export const getCourses = async (all: boolean = false) => {
    const response = await fetch(`${API_URL}/courses${all ? '?all=true' : ''}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch courses');
    }

    return response.json();
};

export const updateCourse = async (courseId: string, courseData: any) => {
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update course');
    }

    return response.json();
};

export const getCourseById = async (courseId: string) => {
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch course');
    }

    return response.json();
};

export const deleteCourse = async (courseId: string) => {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Handle 204 No Content response (common for DELETE)
        if (response.status === 204) {
            return { success: true, message: 'Course deleted successfully' };
        }

        // Handle other success status codes (200, 201, etc.)
        if (response.ok) {
            // Try to parse JSON, but handle empty response
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    const data = await response.json();
                    return data;
                } catch (e) {
                    // If JSON parsing fails, return success message
                    return { success: true, message: 'Course deleted successfully' };
                }
            }
            return { success: true, message: 'Course deleted successfully' };
        }

        // Handle error responses
        let errorMessage = 'Failed to delete course';
        try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
            // If error response is not JSON, use status text
            errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
    } catch (error: any) {
        // Re-throw if it's already an Error with message
        if (error instanceof Error) {
            throw error;
        }
        // Otherwise wrap in Error
        throw new Error(error.message || 'Failed to delete course');
    }
};
