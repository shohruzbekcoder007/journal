import { AdminAuthorsTable } from "@/components/admin/authors-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { translations, type Language } from "@/lib/translations"
import Link from "next/link"

const authors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    institution: "Stanford University",
    field: "Quantum Physics",
    publications: 45,
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    institution: "MIT",
    field: "Computer Science",
    publications: 78,
    status: "active",
    createdAt: "2024-01-14T15:45:00Z",
  },
]

export default function AdminAuthorsPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang].admin.authors // Access the authors translations directly

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <Link href={`/${lang}/admin/authors/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t.create}
          </Button>
        </Link>
      </div>
      <AdminAuthorsTable data={authors} translations={t} />
    </div>
  )
}

