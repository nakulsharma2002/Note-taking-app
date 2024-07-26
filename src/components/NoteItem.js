import React, { useState } from 'react';

const NoteItem = ({ note, onUpdateNote, onDeleteNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(note.content);

  const handleEdit = () => {
    onUpdateNote({
      ...note,
      content: newContent,
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2>{note.title}</h2>
      {isEditing ? (
        <div>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{note.content}</p>
      )}
      <p>{note.timestamp}</p>
      <button onClick={() => onDeleteNote(note.id)}>Delete</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );
};

export default NoteItem;
