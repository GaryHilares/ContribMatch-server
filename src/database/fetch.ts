import 'dotenv/config'; // or use `require('dotenv').config();` in CommonJS
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getData(): Promise<void> {
  const { data, error } = await supabase.from('users').select('*');
  // .insert({ name: 'Gary', email: 'garypastel@gmail.com' });
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}
