export function fuzzyMatch(search: string, target: string) {

  const s = search.toLowerCase();
  const t = target.toLowerCase();

  let i = 0;

  for (let char of t) {
    if (char === s[i]) {
      i++;
    }
    if (i === s.length) return true;
  }

  return false;
}