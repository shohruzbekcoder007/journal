import { AdminResourcesTable } from "@/components/admin/resources-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { translations, type Language } from "@/lib/translations"
import Link from "next/link"

const resources = [
  {
    id: "1",
    title: "Research Methods Handbook",
    type: "document",
    category: "Guide",
    downloads: 1234,
    status: "published",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Publication Templates",
    type: "template",
    category: "Template",
    downloads: 567,
    status: "published",
    createdAt: "2024-01-14T15:45:00Z",
  },
]

export default function AdminResourcesPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang].admin.resources // Access the resources translations directly

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <Link href={`/${lang}/admin/resources/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t.create}
          </Button>
        </Link>
      </div>
      <AdminResourcesTable data={resources} translations={t} />
    </div>
  )
}

