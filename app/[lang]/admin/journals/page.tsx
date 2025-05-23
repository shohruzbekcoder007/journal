import { ServerTable } from "@/components/server-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { translations, type Language } from "@/lib/translations"
import { parseTableParams, processTableData } from "@/lib/table-utils"
import Link from "next/link"
import { Eye, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"
import { listJournals } from "@/app/actions/journal"

export default async function AdminJournalsPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Language }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const t = translations[lang].admin.journals
  const tableParams = parseTableParams(new URLSearchParams(searchParams as Record<string, string>))

  const journals = await listJournals()

  const { data, pageCount, currentPage } = processTableData(journals, tableParams, [
    "title",
    "field",
    "issn",
    "frequency",
    "year",
    "status",
  ])

  const columns = [
    {
      key: "title",
      header: t.columns.title,
      cell: (journal: (typeof journals)[0]) => journal.title,
      sortable: true,
    },
    {
      key: "field",
      header: t.columns.field,
      cell: (journal: (typeof journals)[0]) => journal.field,
      sortable: true,
    },
    {
      key: "issn",
      header: t.columns.issn,
      cell: (journal: (typeof journals)[0]) => journal.issn,
    },
    {
      key: "frequency",
      header: t.columns.frequency,
      cell: (journal: (typeof journals)[0]) => journal.frequency,
    },
    {
      key: "status",
      header: t.columns.status,
      cell: (journal: (typeof journals)[0]) => (
        <Badge variant={journal.status === "active" ? "default" : "secondary"}>{journal.status}</Badge>
      ),
      sortable: true,
    },
    {
      key: "Year",
      header: t.columns.year,
      cell: (journal: (typeof journals)[0]) => journal.year,
      sortable: true,
    },
    {
      key: "createdAt",
      header: t.columns.createdAt,
      cell: (journal: (typeof journals)[0]) => new Date(journal.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      key: "actions",
      header: t.columns.actions,
      cell: (journal: (typeof journals)[0]) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/${lang}/admin/journals/${journal.id}/articles`} key={journal.id}>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                {t.see}
              </DropdownMenuItem>
            </Link>
            <Link href={`/${lang}/admin/journals/${journal.id}/edit`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                {t.edit}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              {t.delete}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

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
      <ServerTable
        data={data}
        columns={columns}
        pageCount={pageCount}
        currentPage={currentPage}
        searchParams={tableParams}
        searchPlaceholder={t.search}
        noResultsMessage={t.noResults}
        baseUrl={`/${lang}/admin/journals`}
      />
    </div>
  )
}