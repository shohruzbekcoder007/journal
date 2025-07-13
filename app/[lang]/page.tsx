import { Button } from "@/components/ui/button"
import { BookOpen, Download } from "lucide-react"
import { PDFViewer } from "@/components/pdf-viewer"
import Image from "next/image"
import Link from "next/link"
import { translations, type Language } from "@/lib/translations"
import { listJournals } from "@/app/actions/journal"
import { JournalSection } from "@/components/journal-section"

// Define the Journal type with file property
type JournalWithFile = {
  id: number;
  title: string;
  field: string;
  issn: string;
  frequency: string;
  description: string;
  publisher: string;
  status: string;
  type: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  year: number | null;
  issue_number: number | null;
  file?: {
    id: number;
    name: string;
    path: string;
  } | null;
}

export default async function Home({ params: { lang } }: { params: { lang: Language } }) {
  // Ensure lang is a valid key in translations, default to 'en' if not
  const validLang = (lang && translations[lang]) ? lang : 'en'
  const t = translations[validLang]
  
  // Fetch journals from the database on the server
  const journals = await listJournals() as JournalWithFile[]

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

  // Create featured journals from server-side fetched data
  const featuredJournals = journals.slice(0, 3).map(journal => ({
    id: journal.id,
    title: journal.title,
    image: journal.imageUrl || "/journals/marketing-1.jpg", // Use imageUrl if available, otherwise fallback
    type: journal.type || "Scientific",
    url: `/${lang}/journals/${journal.id}`,
    fileUrl: journal.file?.path || null,
    year: journal.year,
    issue_number: journal.issue_number
  }))

  // Sample resources data
  const featuredResources = [
    {
      id: 1,
      title: "Raqamlashtirish va sun'iy intellekt",
      image: "/resources/resource-1.jpg",
      url: `/${lang}/resources/1`,
    },
    {
      id: 2,
      title: "Marketing tadqiqotlari va tahlil",
      image: "/resources/resource-2.jpg",
      url: `/${lang}/resources/2`,
    },
    {
      id: 3,
      title: "Raqamli marketing strategiyalari",
      image: "/resources/resource-3.jpg",
      url: `/${lang}/resources/3`,
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section with Marketing Image */}
      <section className="relative">
        <div className="w-full h-[400px] relative">
          <Image
            src={featuredJournals[0]?.image || "https://cdn.prod.website-files.com/604a97c70aee09eed25ce991/61897a35583a9b51db018d3e_MartinPublicSeating-97560-Importance-School-Library-blogbanner1.jpg"}
            alt="Marketing background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {t?.hero?.title || "Ilmiy-tadqiqot, boshqaruv-biznesga yo'naltirilgan ilmiy va ommabop jurnal"}
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-6">
                  {t?.hero?.description || "Marketing sohasidagi eng so'nggi tadqiqotlar va yangiliklar"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-gray-300 rounded p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Ilmiy</h3>
            <p className="text-gray-600">Ilmiy maqolalar va tadqiqotlar</p>
          </div>
          <div className="border border-gray-300 rounded p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Amaliy</h3>
            <p className="text-gray-600">Amaliy ko'nikmalar va tajribalar</p>
          </div>
          <div className="border border-gray-300 rounded p-6 text-center hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Ommabop</h3>
            <p className="text-gray-600">Ommabop maqolalar va yangiliklar</p>
          </div>
        </div>

        {/* Featured Journals Section */}
        <JournalSection 
          initialJournals={featuredJournals} 
          lang={lang} 
          title={t.sections?.featuredJournals || "Featured Journals"} 
          viewAllLink={`/${lang}/journals`} 
          viewAllText={t.sections?.viewAll || "View All"} 
        />

        {/* Eng ko'p o'qilgan maqolalar */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Eng ko'p o'qilgan maqolalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <div key={resource.id} className="group">
                <Link href={resource.url} className="block">
                  <div className="relative h-[200px] mb-3 overflow-hidden">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800">{resource.title}</h3>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Journal Issues Online Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t?.sections?.onlineJournal || "Jurnal sonlarini online ko'rish"}</h2>
            
            {/* Journal Issue Selection */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button variant="default" className="rounded-full">4-son (2023)</Button>
              <Button variant="outline" className="rounded-full">3-son (2023)</Button>
              <Button variant="outline" className="rounded-full">2-son (2023)</Button>
              <Button variant="outline" className="rounded-full">1-son (2023)</Button>
              <Button variant="outline" className="rounded-full">4-son (2022)</Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <div className="border rounded-lg overflow-hidden bg-white shadow-md">
                  {/* PDF Viewer Component */}
                  <div className="pdf-viewer-container">
                    <PDFViewer pdfUrl="/sample-journal.pdf" initialPage={1} />
                  </div>
                  <div className="bg-gray-100 p-4 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border">1</button>
                      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border">2</button>
                      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border">3</button>
                    </div>
                    <Button variant="default">{t?.sections?.fullView || "To'liq ko'rish"}</Button>
                  </div>
                </div>
              </div>
              
              {/* Journal Info Sidebar */}
              <div className="w-full md:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">4-son (2023)</h3>
                  <div className="mb-4">
                    <p className="text-gray-700 mb-2"><strong>ISSN:</strong> 2181-9750</p>
                    <p className="text-gray-700 mb-2"><strong>DOI:</strong> 10.5281/zenodo.7654321</p>
                    <p className="text-gray-700 mb-2"><strong>Nashr sanasi:</strong> 2023-12-15</p>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      PDF yuklab olish
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Havola nusxalash
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}