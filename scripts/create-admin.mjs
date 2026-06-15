import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const email = 'rohanch0804@gmail.com';
  const password = 'faithingod08#';

  console.log(`Creating user ${email}...`);
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) {
    console.error("Error creating user:", error.message);
    if (!error.message.includes("already registered")) {
      return;
    }
  }

  // Get user ID
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  const user = users.users.find(u => u.email === email);
  if (!user) {
    console.error("User not found after creation");
    return;
  }

  console.log(`User ID: ${user.id}`);

  // Update profile to admin
  console.log("Updating profile to admin...");
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id);

  if (profileError) {
    console.error("Error updating profile:", profileError.message);
    // Maybe profile doesn't exist yet? Let's insert
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ id: user.id, full_name: 'Admin', role: 'admin' });
    if (insertError) {
      console.error("Error inserting profile:", insertError.message);
    } else {
      console.log("Profile created and set to admin!");
    }
  } else {
    console.log("Profile updated to admin!");
  }
}

createAdmin();
