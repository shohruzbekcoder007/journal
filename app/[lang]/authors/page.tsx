import { translations } from "@/lib/translations"
import type { Language } from "@/lib/translations"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAuthors } from "@/app/actions/author"

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {authors.map((author) => (
            <div key={author.id} className="flex items-start space-x-4 rounded-lg border p-4">
              <div className="h-60 w-60 bg-background rounded-lg overflow-hidden">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="w-[320px] flex flex-col space-y-2 justify-center pl-1 ">
                <h3 className="font-semibold text-[20px]">{author.name}</h3>
                <div className="text-sm text-muted-foreground">
                  <h5>{author.institution}</h5>
                  <h6 className="my-2">
                    {t.authors.field}: {author.field}
                  </h6>
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

