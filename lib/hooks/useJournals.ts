import { useState, useEffect } from 'react';

// Define the Journal type
export type JournalWithFile = {
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
  file: {
    id: number;
    name: string;
    path: string;
  } | null;
};

export function useJournals() {
  const [journals, setJournals] = useState<JournalWithFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchJournals() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/journals');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch journals: ${response.status}`);
        }
        
        const data = await response.json();
        setJournals(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching journals:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJournals();
  }, []);

  return { journals, isLoading, error };
}
