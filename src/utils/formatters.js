export function formatPopulation(n) {
  if (n == null) return 'N/A';
  return n.toLocaleString();
}

export function formatCurrencies(currencies) {
  if (!currencies) return [];
  return Object.values(currencies).map(c => c.name).filter(Boolean);
}

export function formatLanguages(languages) {
  if (!languages) return [];
  return Object.values(languages).filter(Boolean);
}

export function formatNativeName(nativeName) {
  if (!nativeName) return null;
  const first = Object.values(nativeName)[0];
  return first?.common || first?.official || null;
}

export function formatTLD(tld) {
  if (!tld || !tld.length) return 'N/A';
  return tld.join(', ');
}
