import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use the service role key to bypass RLS, or the anon key if RLS allows updates
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateSam() {
  const bio = "Passionate developer focused on building scalable, efficient web solutions. Dedicated to clean code and bringing creative digital ideas to life.";
  
  const { data, error } = await supabase
    .from('team')
    .update({ bio: bio })
    .eq('name', 'Sam Joan')
    .select();

  if (error) {
    console.error("Error updating bio:", error);
  } else {
    console.log("Successfully updated Sam's bio:", data);
  }
}

updateSam();
