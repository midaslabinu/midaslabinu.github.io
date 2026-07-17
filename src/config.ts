import heroImage from './assets/hero-real.jpg';

export const SITE = {
  website: 'https://midaslabinu.github.io/',
  author: 'MIDAS Lab',
  description:
    'MIDAS Lab conducts research in bioinformatics, network biology, single-cell analysis, healthcare AI, and AI-driven drug discovery.',
  title: 'MIDAS Lab',
  ogImage: 'astropaper-og.jpg',
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000,

  // Lab information
  labName: 'MIDAS Lab',
  university: 'Incheon National University',
  logo: '/assets/logo-real.svg',
  avatar: '/assets/logo-real.svg',
  email: 'midaslabinu@gmail.com',

  // Home page hero section
  hero: {
    title: 'Machine Intelligence & Data Science Lab.',
    subtitle:
      'MIDAS Lab develops computational methods for bioinformatics, network biology, single-cell analysis, healthcare AI, and AI-driven drug discovery.',
    action: 'View Research',
    image: heroImage,
  },

  // Main navigation
  nav: [
    { text: 'Home', link: '/', key: 'home' },
    { text: 'Research', link: '/research', key: 'research' },
    {
      text: 'Publications',
      link: '/publications',
      key: 'publications',
    },
    { text: 'People', link: '/people', key: 'people' },
    { text: 'Software', link: '/software', key: 'software' },
    { text: 'Contact', link: '/contact', key: 'contact' },
  ],

  // Additional pages can be added later.
  customPages: [],

  // Initial development uses English only.
  // Korean/English parallel support will be added later.
  i18n: {
    enabled: false,
    defaultLocale: 'en',
  },
};

export const LOCALE = {
  lang: 'en',
  langTag: ['en-US'],
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS = [
  {
    link: 'https://github.com/midaslabinu',
    active: true,
  },
];

export const DEFAULT_LANG:
  | 'zh'
  | 'en'
  | 'ja'
  | 'ko'
  | 'fr'
  | 'de'
  | 'es'
  | 'ru' = 'en';