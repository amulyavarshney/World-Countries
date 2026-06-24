import { describe, it, expect } from 'vitest';
import {
  formatPopulation,
  formatCurrencies,
  formatLanguages,
  formatNativeName,
  formatTLD,
} from '../utils/formatters';

describe('formatPopulation', () => {
  it('formats large numbers with locale separators', () => {
    const result = formatPopulation(82905782);
    // toLocaleString output varies by environment; just verify it has separators and the right digits
    expect(result).toMatch(/^[\d,. ]+$/);
    expect(result.replace(/[,. ]/g, '')).toBe('82905782');
  });

  it('handles zero', () => {
    expect(formatPopulation(0)).toBe('0');
  });

  it('returns N/A for null/undefined', () => {
    expect(formatPopulation(null)).toBe('N/A');
    expect(formatPopulation(undefined)).toBe('N/A');
  });
});

describe('formatCurrencies', () => {
  it('extracts currency names from object', () => {
    const currencies = { EUR: { name: 'Euro', symbol: '€' }, USD: { name: 'US Dollar', symbol: '$' } };
    expect(formatCurrencies(currencies)).toEqual(['Euro', 'US Dollar']);
  });

  it('returns empty array for null', () => {
    expect(formatCurrencies(null)).toEqual([]);
    expect(formatCurrencies(undefined)).toEqual([]);
  });

  it('skips entries without a name', () => {
    const currencies = { XXX: { symbol: '?' } };
    expect(formatCurrencies(currencies)).toEqual([]);
  });
});

describe('formatLanguages', () => {
  it('extracts language values from object', () => {
    const languages = { deu: 'German', fra: 'French' };
    expect(formatLanguages(languages)).toEqual(['German', 'French']);
  });

  it('returns empty array for null', () => {
    expect(formatLanguages(null)).toEqual([]);
    expect(formatLanguages(undefined)).toEqual([]);
  });
});

describe('formatNativeName', () => {
  it('returns the common native name from the first entry', () => {
    const nativeName = { deu: { common: 'Deutschland', official: 'Bundesrepublik Deutschland' } };
    expect(formatNativeName(nativeName)).toBe('Deutschland');
  });

  it('falls back to official if common is missing', () => {
    const nativeName = { xyz: { official: 'Officialland' } };
    expect(formatNativeName(nativeName)).toBe('Officialland');
  });

  it('returns null for missing input', () => {
    expect(formatNativeName(null)).toBeNull();
    expect(formatNativeName({})).toBeNull();
  });
});

describe('formatTLD', () => {
  it('joins multiple TLDs', () => {
    expect(formatTLD(['.de', '.germany'])).toBe('.de, .germany');
  });

  it('returns single TLD as-is', () => {
    expect(formatTLD(['.jp'])).toBe('.jp');
  });

  it('returns N/A for missing/empty', () => {
    expect(formatTLD(null)).toBe('N/A');
    expect(formatTLD([])).toBe('N/A');
    expect(formatTLD(undefined)).toBe('N/A');
  });
});
