// Type declarations for translations module
export type Language = "en" | "ru" | "uz";

export type AdminSubmissions = {
  title?: string;
  viewTitle?: string;
  back?: string;
  view?: string;
  download?: string;
  approve?: string;
  reject?: string;
  resetStatus?: string;
  statusActive?: string;
  statusInactive?: string;
  statusPending?: string;
  submittedOn?: string;
  authors?: string;
  category?: string;
  keywords?: string;
  abstract?: string;
  comments?: string;
  file?: string;
  tableCaption?: string;
  noResults?: string;
  columns?: {
    title?: string;
    authors?: string;
    category?: string;
    status?: string;
    createdAt?: string;
    actions?: string;
  };
}

export type AdminSection = {
  dashboard: string;
  sidebar: {
    dashboard: string;
    articles: string;
    journals: string;
    authors: string;
    resources: string;
    submissions: string;
  };
  stats: {
    articles: string;
    journals: string;
    authors: string;
    resources: string;
  };
  articles: any;
  journals: any;
  resources: any;
  authors: any;
  submissions?: AdminSubmissions;
  login: any;
}

export type Translation = {
  navigation: {
    articles: string;
    journals: string;
    authors: string;
    resources: string;
  };
  hero: {
    title: string;
    description: string;
    browseButton: string;
    submitButton: string;
  };
  sections: {
    news: string;
    mostRead: string;
    onlineJournal: string;
    fullView: string;
    featuredJournals: string;
    viewAll: string;
  };
  features: any;
  video: any;
  partners: any;
  common: any;
  search: any;
  submit: any;
  articles: any;
  journals: any;
  authors: any;
  resources: any;
  admin: AdminSection;
}

export type CreateArticleDialogTranslations = Translation["admin"]["articles"]["create_p"];

export const translations: {
  en: Translation;
  ru: Translation;
  uz: Translation;
};
