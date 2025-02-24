import { ArticlesTable } from "@/components/articles-table"
import { translations, type Language } from "@/lib/translations"

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

export default function ArticlesPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{t.articles.title}</h1>
        </div>
        <ArticlesTable data={articles} translations={t.articles} />
      </div>
    </div>
  )
}