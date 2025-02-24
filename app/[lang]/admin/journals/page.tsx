import { AdminJournalsTable } from "@/components/admin/journals-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { translations, type Language } from "@/lib/translations"
import Link from "next/link"

const journals = [
  {
    id: "1",
    title: "Journal of Advanced Research",
    field: "Multidisciplinary",
    issn: "2234-5678",
    frequency: "Monthly",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Medical Science Review",
    field: "Medicine",
    issn: "3456-7890",
    frequency: "Quarterly",
    status: "active",
    createdAt: "2024-01-14T15:45:00Z",
  },
]

export default function AdminJournalsPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang].admin.journals // Access the journals translations directly

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <Link href={`/${lang}/admin/journals/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t.create}
          </Button>
        </Link>
      </div>
      <AdminJournalsTable data={journals} translations={t} />
    </div>
  )
}

