import { supabase } from "./src/lib/supabase";

async function inspectTable() {
  const { data, error } = await supabase.from('events').select('*').limit(1);
  if (error) {
    console.error("Inspection Error:", error);
  } else {
    console.log("Table Columns:", Object.keys(data[0] || {}));
    console.log("Sample Data:", data[0]);
  }
}

inspectTable();
