export const formatName = (text?: string) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};