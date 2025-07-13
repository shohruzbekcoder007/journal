import { NextResponse } from 'next/server';

// Sample journal data for development
const sampleJournals = [
  {
    id: 1,
    title: "Marketing va raqamli texnologiyalar",
    field: "Marketing",
    issn: "2181-9750",
    frequency: "Quarterly",
    description: "Marketing va raqamli texnologiyalar sohasidagi eng so'nggi tadqiqotlar",
    publisher: "Marketing University",
    status: "active",
    type: "Scientific",
    imageUrl: "/journals/marketing-1.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    year: 2023,
    issue_number: 4,
    file: {
      id: 1,
      name: "marketing-2023-4.pdf",
      path: "/sample-journal-2023-4.pdf"
    }
  },
  {
    id: 2,
    title: "Raqamli marketing strategiyalari",
    field: "Marketing",
    issn: "2181-9751",
    frequency: "Quarterly",
    description: "Raqamli marketing strategiyalari bo'yicha ilmiy maqolalar to'plami",
    publisher: "Marketing University",
    status: "active",
    type: "Scientific",
    imageUrl: "/journals/marketing-2.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    year: 2023,
    issue_number: 3,
    file: {
      id: 2,
      name: "marketing-2023-3.pdf",
      path: "/sample-journal-2023-3.pdf"
    }
  },
  {
    id: 3,
    title: "Innovatsion marketing yondashuvi",
    field: "Marketing",
    issn: "2181-9752",
    frequency: "Quarterly",
    description: "Innovatsion marketing yondashuvi bo'yicha ilmiy maqolalar",
    publisher: "Marketing University",
    status: "active",
    type: "Scientific",
    imageUrl: "/journals/marketing-3.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    year: 2023,
    issue_number: 2,
    file: {
      id: 3,
      name: "marketing-2023-2.pdf",
      path: "/sample-journal-2023-2.pdf"
    }
  },
  {
    id: 4,
    title: "Bozor tadqiqotlari va tahlil",
    field: "Marketing",
    issn: "2181-9753",
    frequency: "Quarterly",
    description: "Bozor tadqiqotlari va tahlil bo'yicha ilmiy maqolalar",
    publisher: "Marketing University",
    status: "active",
    type: "Scientific",
    imageUrl: "/journals/marketing-4.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    year: 2023,
    issue_number: 1,
    file: {
      id: 4,
      name: "marketing-2023-1.pdf",
      path: "/sample-journal-2023-1.pdf"
    }
  },
  {
    id: 5,
    title: "Raqamli transformatsiya",
    field: "Marketing",
    issn: "2181-9754",
    frequency: "Quarterly",
    description: "Raqamli transformatsiya bo'yicha ilmiy maqolalar",
    publisher: "Marketing University",
    status: "active",
    type: "Scientific",
    imageUrl: "/journals/marketing-5.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    year: 2022,
    issue_number: 4,
    file: {
      id: 5,
      name: "marketing-2022-4.pdf",
      path: "/sample-journal-2022-4.pdf"
    }
  }
];

export async function GET() {
  try {
    // For development, return sample data instead of calling the database
    // In production, you would use: const journals = await listJournals();
    return NextResponse.json(sampleJournals);
  } catch (error) {
    console.error('Error fetching journals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch journals' },
      { status: 500 }
    );
  }
}
