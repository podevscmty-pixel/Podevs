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

async function updateNithinPortfolio() {
  const { data, error } = await supabase
    .from('team')
    .update({ portfolio: 'https://portfolio-0-nebula.vercel.app/' })
    .ilike('name', '%nithin%')
    .select();

  if (error) {
    console.error("Error updating portfolio:", error);
  } else {
    console.log("Successfully updated Nithin's portfolio:", data);
  }
}

updateNithinPortfolio();
