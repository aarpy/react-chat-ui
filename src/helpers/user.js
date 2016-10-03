export function formatName(user) {
  return `${user.first_name} ${user.last_name}`;
}

export function getAvatarPath(avatar_name) {
  return '/public/images/avatar/' + avatar_name;
}
