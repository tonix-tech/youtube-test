import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://moacfvyglbiutqqtidjn.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_bOEHps1Ewq3PaJB5wDByhA_IkG1uZoc';

export const supabase = createClient(supabaseUrl, supabaseKey);
