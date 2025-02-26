import { translations } from "@/lib/translations"
import type { Language } from "@/lib/translations"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAuthors } from "@/app/actions/author"

const authors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    institution: "Stanford University",
    field: "Quantum Physics",
    publications: 45,
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    institution: "MIT",
    field: "Computer Science",
    publications: 78,
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Dr. Emma Williams",
    institution: "Oxford University",
    field: "Neuroscience",
    publications: 32,
    avatar: "/placeholder.svg",
  },
]

export default async function AuthorsPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  const authorList = await getAuthors()
  const authors = authorList.map((author) => ({
    id: author.id,
    name: author.fullName,
    institution: author.institution,
    field: author.researchField,
    publications: author.publicationsCount,
    avatar: author.photo
      // ? `${process.env.NEXT_PUBLIC_SERVER_HOST}${author.photo.path}`
      ? `http://localhost:3000${author.photo.path}`
      : "/placeholder.svg",
  }))

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">{t.authors.title}</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div key={author.id} className="flex items-start space-x-4 rounded-lg border p-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={author.avatar} />
                <AvatarFallback>
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{author.name}</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{author.institution}</p>
                  <p>
                    {t.authors.field}: {author.field}
                  </p>
                  <p>
                    {t.authors.publications}: {author.publications}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

