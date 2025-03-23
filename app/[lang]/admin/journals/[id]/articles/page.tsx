import { CreateArticleDialog } from "@/components/admin/create-article-dialog"
import { translations, type Language, type CreateArticleDialogTranslations } from "@/lib/translations"
import { ServerTable } from "@/components/server-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { parseTableParams, processTableData } from "@/lib/table-utils"
import Link from "next/link"
import { MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"
import { getArticlesFromJournalId } from "@/app/actions/articles"

export default async function AdminArticlesPage({
  params: { lang, id },
  searchParams,
}: {
  params: { lang: Language; id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const t = translations[lang]
  const createArticleTranslations: CreateArticleDialogTranslations = t.admin.articles.create_p
  const tableParams = parseTableParams(new URLSearchParams(searchParams as Record<string, string>))

  const articleList = await (await getArticlesFromJournalId(Number(id))).map((article) => {
    return {
      id: article.id,
      title: article.title,
      authors: article.author,
      // category: article.title,
      status: article.status,
      createdAt: article.createdAt,
      file: article?.file?.path
    }
  })

  const { data, pageCount, currentPage } = processTableData(articleList, tableParams, [
    "title",
    "authors",
    // "category",
    "status",
  ])

  const columns = [
    {
      key: "title",
      header: t.admin.articles.columns.title,
      cell: (article: (typeof articleList)[0]) => article.title,
      sortable: true,
    },
    {
      key: "authors",
      header: t.admin.articles.columns.authors,
      cell: (article: (typeof articleList)[0]) => article.authors,
      sortable: true,
    },
    {
      key: "status",
      header: t.admin.articles.columns.status,
      cell: (article: (typeof articleList)[0]) => (
        <Badge variant={article.status === "active" ? "default" : "secondary"}>{article.status}</Badge>
      ),
      sortable: true,
    },
    {
      key: "file",
      header: t.admin.articles.columns.category,
      cell: (article: (typeof articleList)[0]) => (
        <a href={article.file} target="_blank" rel="noopener noreferrer">
          <Button variant="link">Download PDF</Button>
        </a>),
      sortable: false,
    },
    {
      key: "createdAt",
      header: t.admin.articles.columns.createdAt,
      cell: (article: (typeof articleList)[0]) => new Date(article.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      key: "actions",
      header: t.admin.articles.columns.actions,
      cell: (article: (typeof articleList)[0]) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/${lang}/admin/articles/${article.id}/edit`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                {t.admin.articles.edit}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              {t.admin.articles.delete}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

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
      <ServerTable
        data={data}
        columns={columns}
        pageCount={pageCount}
        currentPage={currentPage}
        searchParams={tableParams}
        searchPlaceholder={t.admin.articles.search}
        noResultsMessage={t.admin.articles.noResults}
        baseUrl={`/${lang}/admin/journals/${id}/articles`}
      />
    </div>
  )
}


