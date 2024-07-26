import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, onUpdateNote, onDeleteNote }) => {
  return (
    <div>
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onUpdateNote={onUpdateNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
