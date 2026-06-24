import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing from environment variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://moacfvyglbiutqqtidjn.supabase.co',
  supabaseAnonKey || 'sb_publishable_bOEHps1Ewq3PaJB5wDByhA_IkG1uZoc'
);
