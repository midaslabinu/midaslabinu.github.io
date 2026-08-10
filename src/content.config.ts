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
      /*
       * 논문 / 특허 제목
       *
       * 기본적으로 영문 제목을 그대로 사용할 수 있으며,
       * 필요한 경우에만 한/영 제목을 별도로 지정할 수 있습니다.
       *
       * 영문:
       * title: "Example Paper Title"
       *
       * 한/영:
       * title:
       *   ko: "논문 제목"
       *   en: "Paper Title"
       */
      title: z.union([
        z.string(),
        z.object({
          ko: z.string(),
          en: z.string(),
        }),
      ]),

      /*
       * 저자 / 발명자
       *
       * 일반 영문 publication:
       * authors:
       *   - "Hyundoo Jeong"
       *   - "John Smith"
       *
       * 국문 이름이 필요한 publication:
       * authors:
       *   ko:
       *     - "정현두"
       *     - "홍길동"
       *   en:
       *     - "Hyundoo Jeong"
       *     - "Gildong Hong"
       */
      authors: z.union([
        z.array(z.string()),
        z.object({
          ko: z.array(z.string()),
          en: z.array(z.string()),
        }),
      ]),

      /*
       * 출판 / 등록 / 출원 연도
       */
      year: z.number(),

      /*
       * 정렬용 날짜
       *
       * 같은 연도 내에서 최신 실적을 위에 표시하기 위해 사용합니다.
       *
       * 논문:
       *   실제 게재일 또는 online publication date
       *
       * 학술대회:
       *   발표일 또는 학술대회 시작일
       *
       * 등록 특허:
       *   등록일
       *
       * 출원 특허:
       *   출원일
       *
       * 예:
       * date: 2026-06-01
       *
       * 기존 publication과의 호환성을 위해 optional로 둡니다.
       */
      date: z.coerce.date().optional(),

      /*
       * 학술지 / 학술대회 / 특허 정보
       *
       * 영문 publication:
       * venue: "IEEE Access"
       *
       * 국문 publication:
       * venue:
       *   ko: "한국정보과학회 논문지"
       *   en: "Journal of KIISE"
       */
      venue: z.union([
        z.string(),
        z.object({
          ko: z.string(),
          en: z.string(),
        }),
      ]),

      /*
       * Publication 종류
       */
      type: z
        .enum([
          'paper',
          'book',
          'patent',
          'software',
        ])
        .default('paper'),

      cover: image().optional(),

      doi: z.string().optional(),

      /*
       * Award
       *
       * 기존 Markdown 파일과의 호환성을 위해
       * 기존 string 방식도 그대로 허용합니다.
       *
       * 영문:
       * award: "Best Paper Award"
       *
       * 한/영:
       * award:
       *   ko: "우수논문상"
       *   en: "Best Paper Award"
       */
      award: z
        .union([
          z.string(),
          z.object({
            ko: z.string(),
            en: z.string(),
          }),
        ])
        .optional(),

      /*
       * 공동 제1저자
       *
       * 저자 식별은 영문 이름을 기준으로 합니다.
       *
       * 예:
       * equalContributionAuthors:
       *   - "Heechang Shin"
       *   - "Taeyeong Jang"
       */
      equalContributionAuthors: z
        .array(z.string())
        .optional(),

      /*
       * 교신저자
       *
       * 저자 식별은 영문 이름을 기준으로 합니다.
       *
       * 예:
       * correspondingAuthors:
       *   - "Hyundoo Jeong"
       *   - "Hyun-Myung Woo"
       */
      correspondingAuthors: z
        .array(z.string())
        .optional(),

      /*
       * 외부 링크
       */
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

      /*
       * Featured publication 여부
       */
      featured: z.boolean().default(false),

      /*
       * Award / Patent Status 등의 badge
       *
       * 기존:
       * badges:
       *   - text: "Pending"
       *     type: "blue"
       *
       * 다국어:
       * badges:
       *   - text:
       *       ko: "출원"
       *       en: "Pending"
       *     type: "blue"
       */
      badges: z
        .array(
          z.object({
            text: z.union([
              z.string(),
              z.object({
                ko: z.string(),
                en: z.string(),
              }),
            ]),

            type: z
              .enum([
                'gold',
                'blue',
                'red',
                'green',
                'default',
              ])
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
    
      name: z.union([
        z.string(),
        z.object({
          ko: z.string(),
          en: z.string(),
        }),
      ]),

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
/*
      title: z
        .object({
          ko: z.array(z.string()),
          en: z.array(z.string()),
        })
        .optional(),

      avatar: image(),

      bio: z
        .object({
          ko: z.string(),
          en: z.string(),
        })
        .optional(),
*/
title: z
  .union([
    z.array(z.string()),
    z.object({
      ko: z.array(z.string()),
      en: z.array(z.string()),
    }),
  ])
  .optional(),

avatar: image(),

bio: z
  .union([
    z.string(),
    z.object({
      ko: z.string(),
      en: z.string(),
    }),
  ])
  .optional(),
  // md 수정후 삭제 
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
      name: z.union([
        z.string(),
        z.object({
          ko: z.string(),
          en: z.string(),
        }),
      ]),

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
        title: z.object({
          ko: z.string(),
          en: z.string(),
        }),

        date: z.coerce.date(),

        summary: z.object({
          ko: z.string(),
          en: z.string(),
        }),

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
      title: z.union([
        z.string(),
        z.object({
          ko: z.string(),
          en: z.string(),
        }),
      ]),

      slug: z.string(),

      description: z.union([
        z.string(),
        z.object({
          ko: z.string(),
          en: z.string(),
        }),
      ]),

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
 * 현재 category는 대부분 Bioinformatics이지만,
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

      /*
       * Software 이름은 고유명사이므로
       * 한글/영문 페이지에서 동일하게 표시합니다.
       *
       * 예:
       * title: "PRIME"
       */
      title: z.string(),

      /*
       * Software 카드에 표시할 1~2문장의 설명입니다.
       *
       * 기존 영문 MD와의 호환성을 위해 string도 허용하며,
       * 한글화를 적용할 경우 ko/en 구조를 사용합니다.
       *
       * 기존:
       * description: "A computational tool for..."
       *
       * 다국어:
       * description:
       *   ko: "..."
       *   en: "..."
       */
      description: z.union([
        z.string(),
        z.object({
          ko: z.string(),
          en: z.string(),
        }),
      ]),

      /*
       * 개발자 이름은 원래 표기를 유지합니다.
       */
      developers: z.array(z.string()).optional(),

      /*
       * 최초 논문 발표 또는 공개 연도
       */
      year: z.number().optional(),

      /*
       * Software 전용 이미지 또는 로고
       */
      logo: image().optional(),

      /* -----------------------------------------------------
         분류 정보
         ----------------------------------------------------- */

      /*
       * category 값은 내부 데이터에서는 영어로 유지합니다.
       *
       * 화면에서는 software.astro에서
       * 언어에 따라 번역하여 표시할 수 있습니다.
       *
       * Bioinformatics
       * → 생물정보학
       */
      category: z
        .enum([
          'Bioinformatics',
          'Healthcare AI',
          'AI for Science & Engineering',
        ])
        .default('Bioinformatics'),

      /*
       * Software 형태 역시 내부 데이터에서는 영어로 유지하고
       * 화면에서 번역합니다.
       *
       * Research Code
       * Web Application
       * Software Package
       * Pipeline
       * Benchmark / Resource
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
       *
       * 예:
       * Python
       * R
       * MATLAB
       * Java
       * C++
       * TensorFlow
       *
       * 기술명은 번역하지 않고 그대로 표시합니다.
       */
      languages: z.array(z.string()).optional(),

      /*
       * 세부 검색 및 분류용 태그
       */
      tags: z.array(z.string()).optional(),

      /* -----------------------------------------------------
         관련 논문
         ----------------------------------------------------- */

      /*
       * Software와 연결된 대표 논문입니다.
       *
       * 논문 제목과 학술지명은 공식 서지정보이므로
       * 한글/영문 페이지에서 원문 그대로 표시합니다.
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

      /*
       * status 역시 내부 데이터에서는 영어로 유지하고
       * software.astro에서 한글로 변환하여 표시합니다.
       */
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

      /*
       * false이면 Software 페이지에서 숨깁니다.
       */
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