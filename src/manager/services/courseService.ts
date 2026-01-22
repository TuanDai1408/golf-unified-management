import { supabase } from '../../shared/supabase';

const API_URL = 'http://localhost:5000/api';

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

