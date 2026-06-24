import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://moacfvyglbiutqqtidjn.supabase.co';
const supabaseKey = 'sb_publishable_bOEHps1Ewq3PaJB5wDByhA_IkG1uZoc';
export const supabase = createClient(supabaseUrl, supabaseKey);
