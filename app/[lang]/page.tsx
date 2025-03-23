import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { translations, type Language } from "@/lib/translations"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { PartnersCarousel } from "@/components/partners-carousel"
import Image from "next/image"

export default function Home({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]

  // Sample partners data - in a real app, this would come from an API or CMS
  const partners = [
    {
      id: 1,
      name: "Harvard University",
      logo: "/partners/harvard.svg",
      url: "https://harvard.edu",
    },
    {
      id: 2,
      name: "MIT",
      logo: "/partners/mit.svg",
      url: "https://mit.edu",
    },
    {
      id: 3,
      name: "Stanford University",
      logo: "/partners/stanford.svg",
      url: "https://stanford.edu",
    },
    {
      id: 4,
      name: "Oxford University",
      logo: "/partners/oxford.svg",
      url: "https://ox.ac.uk",
    },
    {
      id: 5,
      name: "Cambridge University",
      logo: "/partners/cambridge.svg",
      url: "https://cam.ac.uk",
    },
    {
      id: 6,
      name: "Princeton University",
      logo: "/partners/princeton.svg",
      url: "https://princeton.edu",
    },
    {
      id: 7,
      name: "Yale University",
      logo: "/partners/yale.svg",
      url: "https://yale.edu",
    },
    {
      id: 8,
      name: "Columbia University",
      logo: "/partners/columbia.svg",
      url: "https://columbia.edu",
    },
  ]

  return (
    <div>
      <section className="relative min-h-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.prod.website-files.com/604a97c70aee09eed25ce991/61897a35583a9b51db018d3e_MartinPublicSeating-97560-Importance-School-Library-blogbanner1.jpg"
            alt="Library background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[64rem] flex flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white">{t?.hero?.title}</h1>
            <p className="mx-auto max-w-[42rem] leading-normal text-white/80 sm:text-xl sm:leading-8">
              {t?.hero?.description}
            </p>
            <div className="space-x-4 mt-6">
              <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90">
                <BookOpen className="mr-2 h-4 w-4" />
                {t?.hero?.browseButton}
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                {t?.hero?.submitButton}
              </Button>
            </div>
          </div>
        </div>

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1400 240"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <div className="container">
        <main className="flex-1">
          {/* <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
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
        </section> */}

          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container">
              <div className="mx-auto max-w-[58rem] flex flex-col items-center space-y-4 text-center mb-10">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-4xl">{t?.video?.title}</h2>
                <p className="text-muted-foreground text-lg max-w-[42rem]">{t?.video?.description}</p>
              </div>
              <div className="mx-auto max-w-4xl">
                <YouTubeEmbed videoId="dQw4w9WgXcQ" title={t?.video?.videoTitle} className="border border-border" />
                <div className="mt-4 text-sm text-muted-foreground text-center">{t?.video?.caption}</div>
              </div>
            </div>
          </section>

          <section className="space-y-6 py-8 md:py-12 lg:py-24">
            <div className="mx-auto max-w-[58rem] flex flex-col items-center space-y-4 text-center">
              <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">{t?.features?.title}</h2>
            </div>
            <div className="mx-auto max-w-[64rem] grid justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold">{t?.features?.peerReview?.title}</h3>
                    <p className="text-sm text-muted-foreground">{t?.features?.peerReview?.description}</p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold">{t?.features?.citation?.title}</h3>
                    <p className="text-sm text-muted-foreground">{t?.features?.citation?.description}</p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold">{t?.features?.analytics?.title}</h3>
                    <p className="text-sm text-muted-foreground">{t?.features?.analytics?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          
        </main>
        
      </div>
      <section className="py-12 md:py-16 relative">
            {/* Top Curve */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className="w-full h-auto"
                preserveAspectRatio="none"
              >
                <path
                  fill="#f3f4f6"
                  fillOpacity="1"
                  d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>

            <div className="container relative z-10">
              <PartnersCarousel partners={partners} title={t?.partners?.title} description={t?.partners?.description} />
            </div>

            {/* Bottom Curve */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className="w-full h-auto"
                preserveAspectRatio="none"
              >
                <path
                  fill="#f3f4f6"
                  fillOpacity="1"
                  d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
              </svg>
            </div>
          </section>
    </div>
  )
}