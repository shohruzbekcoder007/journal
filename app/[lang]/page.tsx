import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { translations, type Language } from "@/lib/translations"

export default function Home({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  return (
    <div className="container">
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="mx-auto max-w-[64rem] flex flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">{t?.hero?.title}</h1>
            <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              {t?.hero?.description}
            </p>
            <div className="space-x-4">
              <Button size="lg">
                <BookOpen className="mr-2 h-4 w-4" />
                {t?.hero?.browseButton}
              </Button>
              <Button size="lg" variant="outline">
                {t?.hero?.submitButton}
              </Button>
            </div>
          </div>
        </section>

        <section className="space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto max-w-[58rem] flex flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{t.features.title}</h2>
          </div>
          <div className="mx-auto max-w-[64rem] grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">{t.features.peerReview.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.features.peerReview.description}</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">{t.features.citation.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.features.citation.description}</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">{t.features.analytics.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.features.analytics.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

