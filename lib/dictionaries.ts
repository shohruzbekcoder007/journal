import "server-only"
import type { Dictionary, Locale } from "./types"

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    navigation: {
      articles: "Articles",
      journals: "Journals",
      authors: "Authors",
      resources: "Resources",
    },
    common: {
      submitPaper: "Submit Paper",
      browseArticles: "Browse Articles",
      submitResearch: "Submit Research",
      footer: "© 2024 SciPublish. Advancing scientific knowledge through collaboration.",
    },
    home: {
      title: "Advancing Research Through Collaboration",
      description:
        "A comprehensive platform for research teams to publish, collaborate, and advance scientific knowledge. Streamline your publication process with our integrated tools and expert review system.",
      featuresTitle: "Publication Features",
      features: [
        {
          title: "Peer Review System",
          description: "Robust double-blind peer review process with expert reviewers across multiple disciplines",
        },
        {
          title: "Citation Management",
          description:
            "Integrated citation tools supporting multiple formats (APA, MLA, Chicago) with automatic formatting",
        },
        {
          title: "Research Analytics",
          description: "Comprehensive analytics dashboard tracking citations, downloads, and research impact metrics",
        },
      ],
    },
  },
  ru: {
    // ... Russian translations (same structure as English)
    navigation: {
      articles: "Статьи",
      journals: "Журналы",
      authors: "Авторы",
      resources: "Ресурсы",
    },
    common: {
      submitPaper: "Отправить статью",
      browseArticles: "Просмотр статей",
      submitResearch: "Отправить исследование",
      footer: "© 2024 SciPublish. Развитие научных знаний через сотрудничество.",
    },
    home: {
      title: "Развитие исследований через сотрудничество",
      description:
        "Комплексная платформа для исследовательских групп для публикации, сотрудничества и развития научных знаний. Оптимизируйте процесс публикации с помощью наших интегрированных инструментов и системы экспертной оценки.",
      featuresTitle: "Особенности публикации",
      features: [
        {
          title: "Система рецензирования",
          description: "Надежный процесс двойного слепого рецензирования с экспертами из разных дисциплин",
        },
        {
          title: "Управление цитированием",
          description: "Интегрированные инструменты цитирования с поддержкой различных форматов (APA, MLA, Chicago)",
        },
        {
          title: "Аналитика исследований",
          description:
            "Комплексная панель аналитики для отслеживания цитирований, загрузок и метрик влияния исследований",
        },
      ],
    },
  },
  uz: {
    // ... Uzbek translations (same structure as English)
    navigation: {
      articles: "Maqolalar",
      journals: "Jurnallar",
      authors: "Mualliflar",
      resources: "Resurslar",
    },
    common: {
      submitPaper: "Maqola yuborish",
      browseArticles: "Maqolalarni ko'rish",
      submitResearch: "Tadqiqot yuborish",
      footer: "© 2024 SciPublish. Hamkorlik orqali ilmiy bilimlarni rivojlantirish.",
    },
    home: {
      title: "Hamkorlik orqali tadqiqotlarni rivojlantirish",
      description:
        "Ilmiy guruhlar uchun nashr etish, hamkorlik qilish va ilmiy bilimlarni rivojlantirish uchun keng qamrovli platforma. Integratsiyalashgan vositalar va ekspert baholash tizimi yordamida nashr jarayonini optimallashing.",
      featuresTitle: "Nashr xususiyatlari",
      features: [
        {
          title: "Ekspert baholash tizimi",
          description: "Turli sohalar bo'yicha ekspertlar bilan ikki tomonlama ko'r baholash jarayoni",
        },
        {
          title: "Iqtiboslarni boshqarish",
          description:
            "Turli formatlarni (APA, MLA, Chicago) qo'llab-quvvatlovchi integratsiyalashgan iqtibos vositalari",
        },
        {
          title: "Tadqiqot tahlili",
          description:
            "Iqtiboslar, yuklab olishlar va tadqiqot ta'siri ko'rsatkichlarini kuzatish uchun keng qamrovli tahlil paneli",
        },
      ],
    },
  },
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale] || dictionaries.en
}

