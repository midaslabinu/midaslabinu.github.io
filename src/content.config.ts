import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* =========================================================
   Publications
   ========================================================= */

const publications = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/publications',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      authors: z.array(z.string()),
      year: z.number(),
      venue: z.string(),

      type: z
        .enum(['paper', 'book', 'patent', 'software'])
        .default('paper'),

      cover: image().optional(),
      doi: z.string().optional(),
      award: z.string().optional(),

      equalContributionAuthors: z.array(z.string()).optional(),
      correspondingAuthors: z.array(z.string()).optional(),

      links: z
        .object({
          // 논문, 북챕터, 특허 등의 공식 상세 페이지
          view: z.string().optional(),

          // preprint 또는 직접 PDF 링크
          pdf: z.string().optional(),

          // 연구 프로젝트 전용 페이지
          project: z.string().optional(),

          // 일반 관련 웹사이트
          website: z.string().optional(),

          // 코드 및 부가 자료
          code: z.string().optional(),
          demo: z.string().optional(),
          slides: z.string().optional(),
          video: z.string().optional(),
        })
        .optional(),

      featured: z.boolean().default(false),

      badges: z
        .array(
          z.object({
            text: z.string(),
            type: z
              .enum(['gold', 'blue', 'red', 'green', 'default'])
              .default('default'),
          })
        )
        .optional(),
    }),
});

/* =========================================================
   Books
   ========================================================= */

const books = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/books',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      authors: z.array(z.string()),
      year: z.number(),
      venue: z.string(),

      cover: image().optional(),
      doi: z.string().optional(),
      award: z.string().optional(),

      links: z
        .object({
          pdf: z.string().optional(),
          code: z.string().optional(),
          website: z.string().optional(),
          demo: z.string().optional(),
          slides: z.string().optional(),
          video: z.string().optional(),
        })
        .optional(),

      badges: z
        .array(
          z.object({
            text: z.string(),
            type: z
              .enum(['gold', 'blue', 'red', 'green', 'default'])
              .default('default'),
          })
        )
        .optional(),
    }),
});

/* =========================================================
   People
   ========================================================= */

const people = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/people',
  }),

  schema: ({ image }) =>
    z.object({
      name: z.string(),

      role: z.enum([
        'Principal Investigator',
        'Professor',
        'Associate Professor',
        'Assistant Professor',
        'Postdoc',
        'Research Assistant',
        'PhD Student',
        'Master Student',
        'Undergraduate',
        'Alumni',
      ]),

      title: z.array(z.string()).optional(),
      avatar: image(),
      bio: z.string().optional(),

      email: z.string().optional(),
      website: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      googleScholar: z.string().optional(),

      weight: z.number().default(100),
    }),
});

/* =========================================================
   Team
   ========================================================= */

const team = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/team',
  }),

  schema: ({ image }) =>
    z.object({
      name: z.string(),

      role: z.enum([
        'Principal Investigator',
        'Professor',
        'Associate Professor',
        'Assistant Professor',
        'Postdoc',
        'Research Assistant',
        'PhD Student',
        'Master Student',
        'Undergraduate',
        'Alumni',
      ]),

      title: z.array(z.string()).optional(),
      avatar: image(),
      bio: z.string().optional(),

      email: z.string().optional(),
      website: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
      twitter: z.string().optional(),
      googleScholar: z.string().optional(),

      weight: z.number().default(100),
    }),
});

/* =========================================================
   News
   ========================================================= */

const news = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/news',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),

      image: image().optional(),

      published: z.boolean().default(true),
      readMore: z.boolean().default(false),

      links: z
        .object({
          view: z.string().optional(),
        })
        .optional(),
    }),
});

/* =========================================================
   Research
   ========================================================= */

const research = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/research',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),

      // Research 페이지 내부 섹션 ID
      slug: z.string(),

      // 대분류의 짧은 소개
      description: z.string(),

      cover: image().optional(),

      order: z.number().default(100),
      published: z.boolean().default(true),
    }),
});

/* =========================================================
   Patents
   ========================================================= */

const patents = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/patents',
  }),

  schema: z.object({
    title: z.string(),
    inventors: z.array(z.string()),
    number: z.string(),
    date: z.date(),

    status: z.enum([
      'Granted',
      'Pending',
      'Filed',
    ]),

    link: z.string().optional(),
  }),
});

/* =========================================================
   Software
   ========================================================= */

/*
 * Software 항목별 Markdown 파일을 관리합니다.
 *
 * 파일 위치:
 * src/content/softwares/*.md
 *
 * 지원 항목:
 * - GitHub 연구 코드
 * - 웹 애플리케이션 및 웹 서버
 * - 소프트웨어 패키지
 * - 분석 파이프라인
 * - 벤치마크 및 연구 리소스
 *
 * 현재 category는 모두 Bioinformatics이지만,
 * 향후 분야 확장을 위해 스키마에는 유지합니다.
 */
const softwares = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/softwares',
  }),

  schema: ({ image }) =>
    z.object({
      /* -----------------------------------------------------
         기본 정보
         ----------------------------------------------------- */

      title: z.string(),

      // Software 카드에 표시할 1~2문장의 짧은 설명
      description: z.string(),

      // 개발자 정보는 선택 사항
      developers: z.array(z.string()).optional(),

      // 최초 논문 발표 또는 공개 연도
      year: z.number().optional(),

      // Software 전용 이미지 또는 로고
      logo: image().optional(),

      /* -----------------------------------------------------
         분류 정보
         ----------------------------------------------------- */

      /*
       * 현재는 Bioinformatics가 기본값입니다.
       * 다른 카테고리가 추가되기 전까지 화면에서는 숨깁니다.
       */
      category: z
        .enum([
          'Bioinformatics',
          'Healthcare AI',
          'AI for Science & Engineering',
        ])
        .default('Bioinformatics'),

      /*
       * 코드 또는 서비스의 형태
       */
      type: z
        .enum([
          'Research Code',
          'Web Application',
          'Software Package',
          'Pipeline',
          'Benchmark / Resource',
        ])
        .default('Research Code'),

      /*
       * 개발 언어 또는 주요 기술
       * 예: Python, R, MATLAB, Java, C++, TensorFlow
       */
      languages: z.array(z.string()).optional(),

      /*
       * 세부 검색 및 분류용 태그
       * 현재 화면에서는 배지로 일부 표시할 수 있습니다.
       */
      tags: z.array(z.string()).optional(),

      /* -----------------------------------------------------
         관련 논문
         ----------------------------------------------------- */

      /*
       * Software와 연결된 대표 논문입니다.
       * 카드에서 논문 제목, 학술지, 연도와 링크를 표시합니다.
       */
      paper: z
        .object({
          title: z.string(),
          venue: z.string(),
          year: z.number(),

          /*
           * DOI, 출판사 페이지 또는 PubMed 링크
           */
          url: z.string(),
        })
        .optional(),

      /* -----------------------------------------------------
         외부 링크
         ----------------------------------------------------- */

      /*
       * 모든 링크는 선택 사항입니다.
       *
       * GitHub가 없는 과거 코드도 논문만 표시할 수 있고,
       * 웹 애플리케이션은 website 또는 demo만 사용할 수 있습니다.
       */
      links: z
        .object({
          // GitHub 저장소
          github: z.string().optional(),

          // 운영 중인 웹 애플리케이션 또는 공식 사이트
          website: z.string().optional(),

          // 별도의 데모 페이지
          demo: z.string().optional(),

          // 설치법 및 사용 설명서
          documentation: z.string().optional(),

          // 직접 다운로드 페이지
          download: z.string().optional(),

          // 최신 GitHub Release 등
          release: z.string().optional(),
        })
        .optional(),

      /* -----------------------------------------------------
         상태 및 표시 설정
         ----------------------------------------------------- */

      status: z
        .enum([
          'Active',
          'Maintained',
          'Archived',
          'Legacy',
          'Under Development',
        ])
        .default('Active'),

      /*
       * true인 항목은 Featured Software에 표시합니다.
       *
       * 초기 Featured:
       * - PRIME
       * - NAPAbench 2
       * - CUFID-align
       */
      featured: z.boolean().default(false),

      // false이면 Software 페이지에서 숨깁니다.
      published: z.boolean().default(true),

      /*
       * Featured 및 전체 Software 목록의 표시 순서입니다.
       * 숫자가 작을수록 먼저 표시됩니다.
       */
      order: z.number().default(100),
    }),
});

/* =========================================================
   Honors
   ========================================================= */

const honors = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/honors',
  }),

  schema: z.object({
    title: z.string(),
    award: z.string(),
    date: z.date(),
    year: z.string(),

    type: z
      .enum(['Challenge Cup', 'Internet+', 'Other'])
      .default('Other'),

    level: z
      .enum(['Special', 'First', 'Second', 'Third'])
      .default('Third'),
  }),
});

/* =========================================================
   Activities
   ========================================================= */

const activities = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/activities',
  }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      cover: image().optional(),
      description: z.string().optional(),
    }),
});

/* =========================================================
   Collection exports
   ========================================================= */

export const collections = {
  publications,
  books,
  team,
  people,
  news,
  research,
  patents,
  softwares,
  honors,
  activities,
};