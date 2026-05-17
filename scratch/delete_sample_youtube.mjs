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

async function deleteSampleYoutube() {
  const idsToDelete = ['dQw4w9WgXcQ', '9bZkp7q19f0', 'FTQbiNvZqaY'];
  const { data, error } = await supabase
    .from('youtube_videos')
    .delete()
    .in('id', idsToDelete)
    .select();

  if (error) {
    console.error("Error deleting video:", error);
  } else {
    console.log("Successfully deleted sample videos:", data);
  }
}

deleteSampleYoutube();
