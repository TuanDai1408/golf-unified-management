import { supabase } from '../../shared/supabase';
import { apiService } from './api';

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
    return apiService.createCourse(courseData);
};

export const getCourses = async (all: boolean = false) => {
    return apiService.getCourses(); // apiService.getCourses already includes ?all=true
};

export const updateCourse = async (courseId: string, courseData: any) => {
    return apiService.updateCourse(courseId, courseData);
};

export const getCourseById = async (courseId: string) => {
    return apiService.getCourseById(courseId);
};

export const deleteCourse = async (courseId: string) => {
    return apiService.deleteCourse(courseId);
};
