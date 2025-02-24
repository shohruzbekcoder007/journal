export type Locale = "en" | "ru" | "uz"

export type NavigationDict = {
  articles: string
  journals: string
  authors: string
  resources: string
}

export type Dictionary = {
  navigation: NavigationDict
  common: {
    submitPaper: string
    browseArticles: string
    submitResearch: string
    footer: string
  }
  home: {
    title: string
    description: string
    featuresTitle: string
    features: Array<{
      title: string
      description: string
    }>
  }
}

