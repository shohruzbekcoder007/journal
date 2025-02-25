import { ServerTable } from "@/components/server-table"
import { translations, type Language } from "@/lib/translations"
import { parseTableParams, processTableData } from "@/lib/table-utils"

// Simulated article data - in real app, this would come from an API or database
const articles = [
  {
    id: "1",
    title: "Advances in Quantum Computing: A New Paradigm",
    authors: "John Smith, Maria Garcia",
    category: "Computer Science",
    createdAt: "2024-02-15T10:30:00Z",
    status: "published",
  },
  {
    id: "2",
    title: "Climate Change Effects on Marine Ecosystems",
    authors: "David Chen, Sarah Johnson",
    category: "Environmental Science",
    createdAt: "2024-02-14T15:45:00Z",
    status: "published",
  },
  {
    id: "3",
    title: "Novel Approaches to Cancer Treatment",
    authors: "Emma Williams, James Lee",
    category: "Medicine",
    createdAt: "2024-02-13T09:20:00Z",
    status: "published",
  },
  {
    id: "4",
    title: "Machine Learning in Healthcare",
    authors: "Michael Brown, Lisa Anderson",
    category: "Healthcare",
    createdAt: "2024-02-12T14:15:00Z",
    status: "published",
  },
  {
    id: "5",
    title: "Sustainable Energy Solutions",
    authors: "Robert Taylor, Anna Martinez",
    category: "Engineering",
    createdAt: "2024-02-11T11:00:00Z",
    status: "published",
  },
]

export default function ArticlesPage({
  params: { lang, id },
  searchParams,
}: {
  params: { lang: Language, id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const t = translations[lang]
  const tableParams = parseTableParams(new URLSearchParams(searchParams as Record<string, string>))

  const { data, pageCount, currentPage } = processTableData(articles, tableParams, ["title", "authors", "category"])

  const columns = [
    {
      key: "title",
      header: t.articles.columns.title,
      cell: (article: (typeof articles)[0]) => <div className="font-medium">{article.title}</div>,
      sortable: true,
    },
    {
      key: "authors",
      header: t.articles.columns.authors,
      cell: (article: (typeof articles)[0]) => article.authors,
      sortable: true,
    },
    {
      key: "category",
      header: t.articles.columns.category,
      cell: (article: (typeof articles)[0]) => article.category,
      sortable: true,
    },
    {
      key: "createdAt",
      header: t.articles.columns.createdAt,
      cell: (article: (typeof articles)[0]) => new Date(article.createdAt).toLocaleDateString(),
      sortable: true,
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