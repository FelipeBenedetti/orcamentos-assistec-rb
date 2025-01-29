import { createClient } from "@supabase/supabase-js";

//const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseURL = 'https://fotkuvjbapiisacckqei.supabase.co';
//const supabaseKEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdGt1dmpiYXBpaXNhY2NrcWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwODE2NzYsImV4cCI6MjA1MzY1NzY3Nn0.yCMXgsK86ndLTbYIdvjN5WbVBTtFcd5bMSwDevdz2y0';
console.log('URL: ', supabaseURL, 'Key: ', supabaseKEY);
const supabase = createClient(supabaseURL, supabaseKEY);
export default supabase; 



/*
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
);


export default supabase;
*/