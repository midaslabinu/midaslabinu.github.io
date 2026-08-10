import heroImage from './assets/hero-real.jpg';

export type NavChild = {
  text: string;
  link: string;
  key: string;
};

export type NavItem = {
  text: string;
  link: string;
  key: string;
  children?: NavChild[];
};

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
    {
      text: 'Home',
      link: '/',
      key: 'home',
    },
    {
      text: 'People',
      link: '/people',
      key: 'people',
      children: [
        {
          text: 'Principal Investigator',
          link: '/people#pi',
          key: 'people.pi',
        },
        {
          text: 'Graduate Students',
          link: '/people#graduate',
          key: 'people.graduate',
        },
        {
          text: 'Undergraduate Students',
          link: '/people#undergraduate',
          key: 'people.undergraduate',
        },
        {
          text: 'Alumni',
          link: '/people#alumni',
          key: 'people.alumni',
        },
      ],
    },
    {
      text: 'Research',
      link: '/research',
      key: 'research',
      children: [
        {
          text: 'Bioinformatics',
          link: '/research#bioinformatics',
          key: 'research.bioinformatics',
        },
        {
          text: 'Healthcare AI',
          link: '/research#healthcare-ai',
          key: 'research.healthcare_ai',
        },
        {
          text: 'AI for Science & Engineering',
          link: '/research#ai-for-science-engineering',
          key: 'research.ai_science',
        },
      ],
    },
    {
      text: 'Publications',
      link: '/publications',
      key: 'publications',
      children: [
        {
          text: 'Journal Articles',
          link: '/publications#journal',
          key: 'publications.journal',
        },
        {
          text: 'Conference Papers',
          link: '/publications#conference',
          key: 'publications.conference',
        },
        {
          text: 'Patents',
          link: '/publications#patent',
          key: 'publications.patents',
        },
        {
          text: 'Books & Book Chapters',
          link: '/publications#book',
          key: 'publications.books',
        },
      ],
    },
    {
      text: 'Software',
      link: '/software',
      key: 'software',
    },
    {
      text: 'Contact',
      link: '/contact',
      key: 'contact',
    },
  ] satisfies NavItem[],

  // Additional pages can be added later.
  customPages: [] as NavItem[],

  // MIDAS Lab supports Korean and English.
  // Korean is used as the default language.
  i18n: {
    enabled: true,
    defaultLocale: 'ko',
  },
};

export const LOCALE = {
  lang: 'ko',
  langTag: ['ko-KR', 'en-US'],
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
  | 'ru' = 'ko';