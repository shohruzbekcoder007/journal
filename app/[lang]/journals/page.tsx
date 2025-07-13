import { listJournals } from "@/app/actions/journal"
import { translations } from "@/lib/translations"
import type { Language } from "@/lib/translations"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, Download } from "lucide-react"
import { JournalList } from "../../../components/journal-list"

type JournalType = "Scientific" | "Amaliy" | "Ommabop";

interface JournalItem {
  id: number;
  title: string;
  field: string;
  issn: string;
  frequency: string;
  description: string;
  publisher: string;
  status: string;
  type: JournalType;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  year: number | null;
  issue_number: number | null;
  file: {
    id: number;
    name: string;
    path: string;
  } | null;
}

export default async function JournalsPage({ params: { lang } }: { params: { lang: Language } }) {
  const t = translations[lang]
  
  // Fetch journals from the database on the server
  const articleList = await listJournals() as JournalItem[]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">{t.journals?.title || "Journals"}</h1>
        <JournalList 
          initialJournals={articleList} 
          lang={lang} 
          translations={t} 
        />
      </div>
    </div>
  )
}


