'use client';

import NoteForm from '@/components/NoteForm/NoteForm'; // Import форми
import css from './CreateNote.module.css';

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}