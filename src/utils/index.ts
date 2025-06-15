export const formatUsername = (username: string): string => {
  if (!username) return "";

  return username
    .trim()
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getFirstName = (fullName: string): string => {
  if (!fullName) return "";

  return formatUsername(fullName).split(" ")[0];
};
