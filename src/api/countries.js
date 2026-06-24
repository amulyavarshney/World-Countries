// Countries data served from /public/countries.json (generated from world-countries + flagcdn.com)
// This avoids the deprecated restcountries.com v3.1 API

let _cache = null;

export function _clearCache() { _cache = null; }

async function getAllData() {
  if (_cache) return _cache;
  const res = await fetch('/countries.json');
  _cache = await res.json();
  return _cache;
}

function filterFields(arr) {
  // Data is already in the right shape — return as-is
  return arr;
}

export async function fetchAllCountries() {
  const data = await getAllData();
  return filterFields(data);
}

export async function fetchByName(name) {
  const data = await getAllData();
  const q = name.toLowerCase();
  return data.filter(c =>
    c.name.common.toLowerCase().includes(q) ||
    c.name.official.toLowerCase().includes(q)
  );
}

export async function fetchByRegion(region) {
  const data = await getAllData();
  return data.filter(c => c.region === region);
}

export async function fetchByLanguage(lang) {
  const data = await getAllData();
  const q = lang.toLowerCase();
  return data.filter(c =>
    c.languages && Object.values(c.languages).some(l => l.toLowerCase() === q)
  );
}

export async function fetchByCurrency(currency) {
  const data = await getAllData();
  const q = currency.toLowerCase();
  return data.filter(c =>
    c.currencies && Object.values(c.currencies).some(cur => cur.name?.toLowerCase() === q)
  );
}

export async function fetchByCode(cca3) {
  const data = await getAllData();
  return data.find(c => c.cca3 === cca3) || null;
}
