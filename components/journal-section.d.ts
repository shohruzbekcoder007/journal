import { type Language } from "../lib/translations"

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

export interface JournalSectionProps {
  initialJournals: JournalItemProps[]
  lang: Language
  title: string
  viewAllLink: string
  viewAllText: string
}

export function JournalSection(props: JournalSectionProps): JSX.Element
