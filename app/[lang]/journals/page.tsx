import { translations } from "@/lib/translations"
import type { Language } from "@/lib/translations"
import Link from "next/link"

const journals = [
  {
    id: "1",
    title: "Journal of Advanced Research",
    field: "Multidisciplinary",
    issn: "2234-5678",
    frequency: "Monthly",
  },
  {
    id: "2",
    title: "Medical Science Review",
    field: "Medicine",
    issn: "3456-7890",
    frequency: "Quarterly",
  },
  {
    id: "3",
    title: "Technology Innovation Journal",
    field: "Technology",
    issn: "4567-8901",
    frequency: "Bi-monthly",
  },
]

export default function JournalsPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">{t.journals.title}</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {journals.map((journal) => (
            <Link href={`/journals/${journal.id}`} key={journal.id}>
            <div
              className="rounded-lg border p-4 cursor-pointer"
            >
              <h3 className="font-semibold">{journal.title}</h3>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>
                  {t.journals.field}: {journal.field}
                </p>
                <p>ISSN: {journal.issn}</p>
                <p>
                  {t.journals.frequency}: {journal.frequency}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


