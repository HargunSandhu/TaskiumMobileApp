import {createClient} from '@supabase/supabase-js';
// import {createClient} from '@supabase/supabase-js/dist/module/index.js';
// import {createClient} from '../../../node_modules/@supabase/supabase-js/dist/index.js';

import {SUPABASE_URL, SUPABASE_KEY} from '@env';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
