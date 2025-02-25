import { JournalForm } from "@/components/admin/journal-form"
import { translations, type Language } from "@/lib/translations"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function NewJournalPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang].admin.journals

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href={`/${lang}/admin`} passHref legacyBehavior>
              <BreadcrumbLink>{translations[lang].admin.dashboard}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link href={`/${lang}/admin/journals`} passHref legacyBehavior>
              <BreadcrumbLink>{t.title}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t.create}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t.create}</h1>
      </div>

      <div className="rounded-lg border p-6">
        <JournalForm lang={lang} />
      </div>
    </div>
  )
}