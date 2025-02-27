import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/dictionaries"
import type { Language } from "@/lib/types"
import { AuthorFormEdit } from "@/components/admin/author-form-edit"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { translations } from "@/lib/translations"
import Link from "next/link"
import { Author, getAuthor } from "@/app/actions/author"

// This would come from your database in a real app
// const getAuthor = async (id: string) => {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 500))

//   // Mock data
//   const author = {
//     id,
//     name: "Dr. Jane Smith",
//     email: "jane.smith@university.edu",
//     institution: "University of Science",
//     field: "computer-science",
//     publications: 42,
//     bio: "Distinguished researcher in artificial intelligence and machine learning with over 15 years of experience.",
//     orcid: "0000-0002-1825-0097",
//     status: "active" as const,
//     avatar: null,
//   }

//   return author
// }

interface EditAuthorPageProps {
  params: {
    lang: Language
    id: string
  }
}

export default async function EditAuthorPage({ params: { lang, id } }: EditAuthorPageProps) {
  const dict = await getDictionary(lang)
  const t = translations[lang].admin.authors

  let author: any
  try {
    author = await getAuthor((+id) as Author["id"])
  } catch (error) {
    notFound()
  }

  // Extract the translations needed for the form
  const formTranslations = {
    edit: dict.admin?.authors?.edit || "Edit Author",
    cancel: dict.admin?.authors?.cancel || "Cancel",
    delete: dict.admin?.authors?.delete || "Delete",
    updating: dict.admin?.authors?.updating || "Updating...",
    updateSuccess: dict.admin?.authors?.updateSuccess || "Author updated successfully",
    updateError: dict.admin?.authors?.updateError || "Failed to update author",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={`/${lang}/admin`} passHref legacyBehavior>
                <BreadcrumbLink>{translations[lang].admin.dashboard}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href={`/${lang}/admin/authors`} passHref legacyBehavior>
                <BreadcrumbLink>{t.title}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{author.fullName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="border rounded-lg p-6">
        <AuthorFormEdit lang={lang} author={author} translations={formTranslations} />
      </div>
    </div>
  )
}