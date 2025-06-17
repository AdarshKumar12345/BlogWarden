const admin = [
  'adarsh8507kumar@gmal.com',
  'admin@gmail.com',
  'superadmin@gmail.com'
];

export default function isAdmin(session) {
  const user = session?.user;
  if (!user) return false;

  // Check if the user's email is in the admin list
  const isEmailAdmin = admin.some(
    (email) => user.email.toLowerCase().trim() === email.toLowerCase().trim()
  );

  if (isEmailAdmin || user.role === 'admin') {
    return true;
  }

  return false;
}
