import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { noteService } from '../../../../lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

const BASE_URL = 'https://notehub.com/';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || 'all';
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  const title = `Notes - ${formattedTag} | NoteHub`;
  const description = `Browse all notes filtered by category: ${formattedTag}.`;
  const url = `${BASE_URL}notes/filter/${tag}`;

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
}

interface NotesPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;

  const tag = resolvedParams.slug?.[0] || '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, 12, tag],
    queryFn: () => noteService.fetchNotes(1, 12, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}