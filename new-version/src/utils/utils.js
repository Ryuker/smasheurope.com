//////////////////////
// utils functions
// Convert special characters in string to alphabetical characters
export function normalizeString(str) {
  const str_norm = str.normalize('NFD').replace(/\p{Diacritic}/gu, ""); 
  return str_norm;
}

export function scrollToAttribute(container, attribute) {
  container.querySelector(`${attribute}`).scrollIntoView({behavior: 'smooth', block: 'center'});
}