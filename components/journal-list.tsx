"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, Download } from "lucide-react"
import { type Language } from "@/lib/translations"

type JournalType = "Scientific" | "Amaliy" | "Ommabop";

type JournalItemProps = {
  id: number
  title: string
  field: string
  issn: string
  frequency: string
  description: string
  publisher: string
  status: string
  type: JournalType
  imageUrl: string | null
  createdAt: Date
  updatedAt: Date
  year: number | null
  issue_number: number | null
  file: {
    id: number
    name: string
    path: string
  } | null
}

type JournalListProps = {
  initialJournals: JournalItemProps[]
  lang: Language
  translations: any
}

export function JournalList({ initialJournals, lang, translations: t }: JournalListProps) {
  const [journals, setJournals] = useState<JournalItemProps[]>(initialJournals)
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {journals.map((journal) => (
        <Link href={`/${lang}/journals/${journal.id}`} key={journal.id}>
          <div
            className="rounded-lg border p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            {journal.imageUrl && (
              <div className="relative h-48 w-full">
                <Image 
                  src={journal.imageUrl || "/journals/marketing-1.jpg"} 
                  alt={journal.title} 
                  fill 
                  className="object-cover" 
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {journal.title}
              </h3>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-500 mr-2">{journal.year || "2023"}{journal.issue_number ? ` • №${journal.issue_number}` : ""}</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {journal.type as JournalType}
                  </span>
                </div>
                <div className="flex gap-2">
                  {journal.file?.path && (
                    <a href={journal.file.path} download target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{t?.sections?.fullView || "Full view"}</span>
                  </Button>
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>
                  {t.journals.field}: {journal.field}
                </p>
                <p>ISSN: {journal.issn}</p>
                <p>
                  {t.journals.frequency}: {journal.frequency}
                </p>
                <p>
                  {t.journals.type || "Type"}: {journal.type}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
