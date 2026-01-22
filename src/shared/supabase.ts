import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://sdezajozxfrtpdhpkvjd.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZXpham96eGZydHBkaHBrdmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NjY5NjAsImV4cCI6MjA4NDA0Mjk2MH0.0RbxZif3tg5djOm9I_9-s7Omv0_CKQDO_hA_2pgIitw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
