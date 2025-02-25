import { ServerTable } from "@/components/server-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { translations, type Language } from "@/lib/translations"
import { parseTableParams, processTableData } from "@/lib/table-utils"
import Link from "next/link"
import { MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"

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

export default function AdminResourcesPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Language }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const t = translations[lang].admin.resources
  const tableParams = parseTableParams(new URLSearchParams(searchParams as Record<string, string>))

  const { data, pageCount, currentPage } = processTableData(resources, tableParams, [
    "title",
    "type",
    "category",
    "status",
  ])

  const columns = [
    {
      key: "title",
      header: t.columns.title,
      cell: (resource: (typeof resources)[0]) => resource.title,
      sortable: true,
    },
    {
      key: "type",
      header: t.columns.type,
      cell: (resource: (typeof resources)[0]) => resource.type,
      sortable: true,
    },
    {
      key: "category",
      header: t.columns.category,
      cell: (resource: (typeof resources)[0]) => resource.category,
      sortable: true,
    },
    {
      key: "downloads",
      header: t.columns.downloads,
      cell: (resource: (typeof resources)[0]) => resource.downloads,
      sortable: true,
    },
    {
      key: "status",
      header: t.columns.status,
      cell: (resource: (typeof resources)[0]) => (
        <Badge variant={resource.status === "published" ? "default" : "secondary"}>{resource.status}</Badge>
      ),
      sortable: true,
    },
    {
      key: "createdAt",
      header: t.columns.createdAt,
      cell: (resource: (typeof resources)[0]) => new Date(resource.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      key: "actions",
      header: t.columns.actions,
      cell: (resource: (typeof resources)[0]) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/${lang}/admin/resources/${resource.id}/edit`}>
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
        <Link href={`/${lang}/admin/resources/new`}>
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
        baseUrl={`/${lang}/admin/resources`}
      />
    </div>
  )
}