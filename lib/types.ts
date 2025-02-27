export type Locale = "en" | "ru" | "uz"

export type Language = Locale

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
  articles?: {
    title: string
    search: string
    noResults: string
    columns: {
      title: string
      authors: string
      category: string
      createdAt: string
    }
  }
  journals?: {
    title: string
    field: string
    frequency: string
  }
  authors?: {
    title: string
    field: string
    publications: string
  }
  resources?: {
    title: string
    download: string
  }
  admin?: {
    dashboard: string
    sidebar: {
      dashboard: string
      articles: string
      journals: string
      authors: string
      resources: string
    }
    stats: {
      articles: string
      journals: string
      authors: string
      resources: string
    }
    articles?: {
      title: string
      create: string
      edit: string
      delete: string
      search: string
      noResults: string
      columns: {
        title: string
        authors: string
        category: string
        status: string
        createdAt: string
        actions: string
      }
      create_p: {
        button: string
        title: string
        description: string
        form: {
          title: string
          titlePlaceholder: string
          abstract: string
          abstractPlaceholder: string
          authors: string
          authorsPlaceholder: string
          category: string
          categoryPlaceholder: string
          submit: string
        }
        success: string
        error: string
      }
    }
    resources?: {
      title: string
      create: string
      edit: string
      delete: string
      search: string
      noResults: string
      columns: {
        title: string
        type: string
        category: string
        downloads: string
        status: string
        createdAt: string
        actions: string
      }
    }
    journals?: {
      title: string
      create: string
      edit: string
      delete: string
      search: string
      noResults: string
      columns: {
        title: string
        field: string
        issn: string
        frequency: string
        status: string
        createdAt: string
        actions: string
      }
    }
    authors?: {
      title: string
      create: string
      edit: string
      delete: string
      search: string
      noResults: string
      cancel: string
      updating: string
      updateSuccess: string
      updateError: string
      columns: {
        name: string
        institution: string
        field: string
        publications: string
        status: string
        createdAt: string
        actions: string
      }
    }
    login?: {
      title: string
      description: string
      emailLabel: string
      emailPlaceholder: string
      passwordLabel: string
      passwordPlaceholder: string
      rememberMe: string
      loginButton: string
      invalidCredentials: string
    }
  }
}

