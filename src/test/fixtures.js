export const mockCountries = [
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany', nativeName: { deu: { common: 'Deutschland', official: 'Bundesrepublik Deutschland' } } },
    tld: ['.de'], cca2: 'DE', cca3: 'DEU', unMember: true,
    capital: ['Berlin'], region: 'Europe', subregion: 'Western Europe',
    languages: { deu: 'German' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    borders: ['AUT', 'BEL', 'FRA'],
    flags: { png: 'https://flagcdn.com/w320/de.png', svg: 'https://flagcdn.com/de.svg', alt: 'Flag of Germany' },
    population: 82905782,
  },
  {
    name: { common: 'France', official: 'French Republic', nativeName: { fra: { common: 'France', official: 'République française' } } },
    tld: ['.fr'], cca2: 'FR', cca3: 'FRA', unMember: true,
    capital: ['Paris'], region: 'Europe', subregion: 'Western Europe',
    languages: { fra: 'French' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    borders: ['AND', 'BEL', 'DEU'],
    flags: { png: 'https://flagcdn.com/w320/fr.png', svg: 'https://flagcdn.com/fr.svg', alt: 'Flag of France' },
    population: 67391582,
  },
  {
    name: { common: 'Japan', official: 'Japan', nativeName: { jpn: { common: '日本', official: '日本国' } } },
    tld: ['.jp'], cca2: 'JP', cca3: 'JPN', unMember: true,
    capital: ['Tokyo'], region: 'Asia', subregion: 'Eastern Asia',
    languages: { jpn: 'Japanese' },
    currencies: { JPY: { name: 'Japanese yen', symbol: '¥' } },
    borders: [],
    flags: { png: 'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg', alt: 'Flag of Japan' },
    population: 125836021,
  },
  {
    name: { common: 'Egypt', official: 'Arab Republic of Egypt', nativeName: { ara: { common: 'مصر', official: 'جمهورية مصر العربية' } } },
    tld: ['.eg'], cca2: 'EG', cca3: 'EGY', unMember: true,
    capital: ['Cairo'], region: 'Africa', subregion: 'Northern Africa',
    languages: { ara: 'Arabic' },
    currencies: { EGP: { name: 'Egyptian pound', symbol: '£' } },
    borders: ['ISR', 'LBY', 'SDN'],
    flags: { png: 'https://flagcdn.com/w320/eg.png', svg: 'https://flagcdn.com/eg.svg', alt: 'Flag of Egypt' },
    population: 100388073,
  },
];

export const mockGermany = mockCountries[0];
export const mockFrance = mockCountries[1];
export const mockJapan = mockCountries[2];
export const mockEgypt = mockCountries[3];
