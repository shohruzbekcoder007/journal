import { translations } from "@/lib/translations"
import type { Language } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { FileText, Book, Video, Download } from "lucide-react"

const resources = [
  {
    id: "1",
    title: "Publication Guidelines",
    type: "document",
    description: "Complete guide for preparing and submitting your research paper",
    icon: FileText,
  },
  {
    id: "2",
    title: "Research Methods Handbook",
    type: "book",
    description: "Comprehensive handbook on research methodologies",
    icon: Book,
  },
  {
    id: "3",
    title: "Video Tutorials",
    type: "video",
    description: "Step-by-step guides for using our platform",
    icon: Video,
  },
  {
    id: "4",
    title: "Templates",
    type: "template",
    description: "Standard templates for different types of publications",
    icon: Download,
  },
]

export default function ResourcesPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">{t.resources.title}</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <div key={resource.id} className="rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
                <Button className="mt-4" variant="outline">
                  {t.resources.download}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

