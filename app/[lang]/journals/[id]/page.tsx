import { ServerTable } from "@/components/server-table"
import { translations, type Language } from "@/lib/translations"
import { parseTableParams, processTableData } from "@/lib/table-utils"
import { getArticlesFromJournalId } from "@/app/actions/articles"
import { Button } from "@/components/ui/button"

export default async function ArticlesPage({
  params: { lang, id },
  searchParams,
}: {
  params: { lang: Language, id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const t = translations[lang]
  const tableParams = parseTableParams(new URLSearchParams(searchParams as Record<string, string>))

  const articleList = await (await getArticlesFromJournalId(Number(id))).map((article) => {
    return {
      id: article.id,
      title: article.title,
      authors: article.author,
      category: article.title,
      status: article.status,
      createdAt: article.createdAt,
      file: article?.file?.path
    }
  })

  const { data, pageCount, currentPage } = processTableData(articleList, tableParams, ["title", "authors"])

  const columns = [
    {
      key: "title",
      header: t.articles.columns.title,
      cell: (article: (typeof articleList)[0]) => <div className="font-medium">{article.title}</div>,
      sortable: true,
    },
    {
      key: "authors",
      header: t.articles.columns.authors,
      cell: (article: (typeof articleList)[0]) => article.authors,
      sortable: true,
    },
    {
      key: "createdAt",
      header: t.articles.columns.createdAt,
      cell: (article: (typeof articleList)[0]) => new Date(article.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      key: "file",
      header: t.articles.columns.file,
      cell: (article: (typeof articleList)[0]) => (
        <a href={article.file} target="_blank" rel="noopener noreferrer">
          <Button variant="link">Download PDF</Button>
        </a>),
      sortable: false,
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{t.articles.title}</h1>
        </div>
        <ServerTable
          data={data}
          columns={columns}
          pageCount={pageCount}
          currentPage={currentPage}
          searchParams={tableParams}
          searchPlaceholder={t.articles.search}
          noResultsMessage={t.articles.noResults}
          baseUrl={`/${lang}/journals/${id}/`}
        />
      </div>
    </div>
  )
}