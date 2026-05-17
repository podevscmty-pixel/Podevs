import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectYoutube() {
  const { data, error } = await supabase.from('youtube_videos').select('*');
  if (error) {
    console.error("Error fetching youtube_videos:", error);
  } else {
    console.log("YouTube videos in DB:", data);
  }
}

inspectYoutube();
