import { describe, it, expect, beforeEach } from 'vitest';
import { mockCountries } from './fixtures';

// Reset the module cache before each test so _cache is cleared
beforeEach(() => {
  vi.resetModules();
  fetch.mockResolvedValue({
    json: async () => mockCountries,
  });
});

describe('fetchAllCountries', () => {
  it('fetches and returns all countries', async () => {
    const { fetchAllCountries } = await import('../api/countries');
    const result = await fetchAllCountries();
    expect(result).toHaveLength(4);
    expect(result[0].name.common).toBe('Germany');
  });

  it('calls /countries.json', async () => {
    const { fetchAllCountries } = await import('../api/countries');
    await fetchAllCountries();
    expect(fetch).toHaveBeenCalledWith('/countries.json');
  });
});

describe('fetchByName', () => {
  it('filters countries by common name (case-insensitive)', async () => {
    const { fetchByName } = await import('../api/countries');
    const result = await fetchByName('ger');
    expect(result).toHaveLength(1);
    expect(result[0].cca3).toBe('DEU');
  });

  it('filters by official name', async () => {
    const { fetchByName } = await import('../api/countries');
    const result = await fetchByName('arab republic');
    expect(result).toHaveLength(1);
    expect(result[0].cca3).toBe('EGY');
  });

  it('returns empty array when no match', async () => {
    const { fetchByName } = await import('../api/countries');
    const result = await fetchByName('zzzzz');
    expect(result).toHaveLength(0);
  });
});

describe('fetchByRegion', () => {
  it('filters countries by exact region', async () => {
    const { fetchByRegion } = await import('../api/countries');
    const result = await fetchByRegion('Europe');
    expect(result).toHaveLength(2);
    expect(result.map(c => c.cca3)).toEqual(expect.arrayContaining(['DEU', 'FRA']));
  });

  it('returns empty for unknown region', async () => {
    const { fetchByRegion } = await import('../api/countries');
    const result = await fetchByRegion('Atlantis');
    expect(result).toHaveLength(0);
  });
});

describe('fetchByLanguage', () => {
  it('filters countries by language name (case-insensitive)', async () => {
    const { fetchByLanguage } = await import('../api/countries');
    const result = await fetchByLanguage('German');
    expect(result).toHaveLength(1);
    expect(result[0].cca3).toBe('DEU');
  });

  it('returns empty for unknown language', async () => {
    const { fetchByLanguage } = await import('../api/countries');
    const result = await fetchByLanguage('Klingon');
    expect(result).toHaveLength(0);
  });
});

describe('fetchByCurrency', () => {
  it('filters countries sharing the same currency', async () => {
    const { fetchByCurrency } = await import('../api/countries');
    const result = await fetchByCurrency('Euro');
    expect(result).toHaveLength(2);
    expect(result.map(c => c.cca3)).toEqual(expect.arrayContaining(['DEU', 'FRA']));
  });

  it('returns empty for unknown currency', async () => {
    const { fetchByCurrency } = await import('../api/countries');
    const result = await fetchByCurrency('Galactic Credit');
    expect(result).toHaveLength(0);
  });
});

describe('fetchByCode', () => {
  it('returns a single country by cca3 code', async () => {
    const { fetchByCode } = await import('../api/countries');
    const result = await fetchByCode('JPN');
    expect(result).not.toBeNull();
    expect(result.name.common).toBe('Japan');
  });

  it('returns null for an unknown code', async () => {
    const { fetchByCode } = await import('../api/countries');
    const result = await fetchByCode('ZZZ');
    expect(result).toBeNull();
  });
});
