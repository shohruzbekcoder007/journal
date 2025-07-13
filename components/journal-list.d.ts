import { type Language } from "../lib/translations"

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

export interface JournalListProps {
  initialJournals: JournalItemProps[]
  lang: Language
  translations: any
}

export function JournalList(props: JournalListProps): JSX.Element
