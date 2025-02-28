import { notFound } from "next/navigation"
import { Pencil } from "lucide-react"

import { JournalFormEdit } from "@/components/admin/journal-form-edit"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { getDictionary } from "@/lib/dictionaries"
import { Language } from "@/lib/types"
import { translations } from "@/lib/translations"
import Link from "next/link"

// This is a sample data fetching function. Replace with your actual data fetching logic
async function getJournal(id: string) {
    // Simulate API call
    const journal = {
        id,
        title: "Sample Journal of Science",
        field: "Computer Science",
        issn: "1234-5678",
        frequency: "Monthly",
        description: "A leading journal in computer science research and innovation.",
        status: "active",
        coverImage: "/placeholder.svg?height=400&width=300",
    }

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return journal
}

interface PageProps {
    params: {
        lang: Language
        id: string
    }
}

export default async function EditJournalPage({ params: { lang, id } }: PageProps) {
    const dict = await getDictionary(lang)
    const t = translations[lang].admin.journals
    const journal = await getJournal(id)

    if (!journal) {
        notFound()
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
                            <Link href={`/${lang}/admin/journals`} passHref legacyBehavior>
                                <BreadcrumbLink>{t.title}</BreadcrumbLink>
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{journal.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Pencil className="h-6 w-6" />
                    <div className="grid gap-1">
                        <h1 className="text-2xl font-bold tracking-tight">{dict.admin?.journals?.edit}</h1>
                        <p className="text-muted-foreground">{journal.title}</p>
                    </div>
                </div>
            </div>
            <JournalFormEdit
                journal={journal}
                translations={{
                    title: dict.admin?.journals?.columns.title ?? "",
                    field: dict.admin?.journals?.columns.field ?? "",
                    issn: dict.admin?.journals?.columns.issn ?? "",
                    frequency: dict.admin?.journals?.columns.frequency ?? "",
                    description: "Description",
                    status: dict.admin?.journals?.columns.status ?? "",
                    submit: dict.admin?.journals?.edit ?? "Update Journal",
                    cancel: "Cancel",
                    success: "Journal updated successfully",
                    error: "Something went wrong",
                }}
            />
        </div>
    )
}