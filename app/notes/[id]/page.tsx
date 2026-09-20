import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api'; 
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from "next"
import { noteService } from '@/lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

const BASE_URL = 'https://notehub.com/';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await noteService.fetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    const description = note.content.slice(0, 150);
    const url = `${BASE_URL}notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub preview image',
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note Details | NoteHub',
      description: 'View note details on NoteHub.',
    };
  }
}

const NoteDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;