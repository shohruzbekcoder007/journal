"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Download } from "lucide-react"
import { type Language } from "@/lib/translations"

export type JournalItemProps = {
  id: number
  title: string
  image: string
  type: string
  url: string
  fileUrl: string | null
  year?: number | null
  issue_number?: number | null
}

export type JournalSectionProps = {
  initialJournals: JournalItemProps[]
  lang: Language
  title: string
  viewAllLink: string
  viewAllText: string
}

export function JournalSection({ initialJournals, lang, title, viewAllLink, viewAllText }: JournalSectionProps) {
  const [journals, setJournals] = useState<JournalItemProps[]>(initialJournals)
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <Link
            href={viewAllLink}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            {viewAllText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journals.map((journal) => (
            <div
              key={journal.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={journal.image}
                  alt={journal.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-medium text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {journal.title}
                </h3>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500 mr-2">{journal.year || "2023"}{journal.issue_number ? ` • №${journal.issue_number}` : ""}</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {journal.type}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {journal.fileUrl && (
                      <a href={journal.fileUrl} download target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                    <Link href={journal.url}>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
