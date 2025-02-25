import { ServerTable } from "@/components/server-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { translations, type Language } from "@/lib/translations"
import { parseTableParams, processTableData } from "@/lib/table-utils"
import Link from "next/link"
import { MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

export default function AdminAuthorsPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Language }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const t = translations[lang].admin.authors
  const tableParams = parseTableParams(new URLSearchParams(searchParams as Record<string, string>))

  const { data, pageCount, currentPage } = processTableData(authors, tableParams, [
    "name",
    "institution",
    "field",
    "status",
  ])

  const columns = [
    {
      key: "name",
      header: t.columns.name,
      cell: (author: (typeof authors)[0]) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {author.name}
        </div>
      ),
      sortable: true,
    },
    {
      key: "institution",
      header: t.columns.institution,
      cell: (author: (typeof authors)[0]) => author.institution,
      sortable: true,
    },
    {
      key: "field",
      header: t.columns.field,
      cell: (author: (typeof authors)[0]) => author.field,
      sortable: true,
    },
    {
      key: "publications",
      header: t.columns.publications,
      cell: (author: (typeof authors)[0]) => author.publications,
      sortable: true,
    },
    {
      key: "status",
      header: t.columns.status,
      cell: (author: (typeof authors)[0]) => (
        <Badge variant={author.status === "active" ? "default" : "secondary"}>{author.status}</Badge>
      ),
      sortable: true,
    },
    {
      key: "createdAt",
      header: t.columns.createdAt,
      cell: (author: (typeof authors)[0]) => new Date(author.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      key: "actions",
      header: t.columns.actions,
      cell: (author: (typeof authors)[0]) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/${lang}/admin/authors/${author.id}/edit`}>
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
        <Link href={`/${lang}/admin/authors/new`}>
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
        baseUrl={`/${lang}/admin/authors`}
      />
    </div>
  )
}