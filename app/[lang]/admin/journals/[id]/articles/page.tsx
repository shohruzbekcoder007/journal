import { AdminArticlesTable } from "@/components/admin/articles-table"
import { CreateArticleDialog } from "@/components/admin/create-article-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { translations, type Language, type CreateArticleDialogTranslations } from "@/lib/translations"

const articles = [
  {
    id: "1",
    title: "Advances in Quantum Computing",
    authors: "John Smith, Maria Garcia",
    category: "Computer Science",
    status: "published",
    createdAt: "2024-02-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Climate Change Effects",
    authors: "David Chen, Sarah Johnson",
    category: "Environmental Science",
    status: "draft",
    createdAt: "2024-02-14T15:45:00Z",
  },
]

export default function AdminArticlesPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]
  const createArticleTranslations: CreateArticleDialogTranslations = t.admin.articles.create_p

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.admin.articles.title}</h1>
        <CreateArticleDialog
          translations={createArticleTranslations}
          trigger={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {createArticleTranslations.button}
            </Button>
          }
        />
      </div>
      <AdminArticlesTable data={articles} translations={t.admin.articles} />
    </div>
  )
}

