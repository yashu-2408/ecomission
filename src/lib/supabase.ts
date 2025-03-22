
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

// Replace with your actual Supabase URL and anon key
// For security, these should ideally be in environment variables
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
