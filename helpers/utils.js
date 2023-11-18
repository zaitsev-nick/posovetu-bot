export const escapeText = (text) => {
  if (text) {
    return text.replace(/</g, '').replace(/>/g, '').replace(/&/g, '');
  }
  return text;
};
