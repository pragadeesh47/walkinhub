import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://geplxkspgocpifpoveqp.supabase.co'; // from your Supabase project settings
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlcGx4a3NwZ29jcGlmcG92ZXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzE2NTQsImV4cCI6MjA2NjM0NzY1NH0.rg-CTKv5TAHSp3NX6cvvNC-XqJKMAAx---_5njNDaL4'; // from your Supabase project settings

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
