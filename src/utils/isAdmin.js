const admin = [
  'adarsh8507kumar@gmail.com',
  'admin@gmail.com',
  'superadmin@gmail.com'
];

export default function isAdmin(session) {
  const user = session?.user;
  if (!user?.email) return false;

  const normalizedUserEmail = user.email.toLowerCase().trim();

  const isEmailAdmin = admin.some(
    (email) => normalizedUserEmail === email.toLowerCase().trim()
  );

  if (isEmailAdmin || user.role?.toLowerCase() === 'admin') {
    return true;
  }

  return false;
}
