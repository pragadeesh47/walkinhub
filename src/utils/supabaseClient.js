import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://geplxkspgocpifpoveqp.supabase.co'; // from your Supabase project settings
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANONKEY; // from your Supabase project settings

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
