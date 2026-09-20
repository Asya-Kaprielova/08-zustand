import type { Metadata } from 'next';
import CreateNote from './CreateNote';

const BASE_URL = 'https://notehub.com/';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note to organize your tasks in NoteHub.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note to organize your tasks in NoteHub.',
    url: `${BASE_URL}notes/action/create`,
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

export default function CreateNotePage() {
  return <CreateNote />;
}