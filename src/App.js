import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const notesPerPage = 10;

  useEffect(() => {
    // Load notes from localStorage on component mount
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const handleAddNote = (note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    localStorage.setItem('notes', JSON.stringify(newNotes));
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (id) => {
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
    localStorage.setItem('notes', JSON.stringify(filteredNotes));
  };

  const handleSearch = (searchTerm) => {
    const filteredNotes = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const currentNotes = notes.slice(startIndex, endIndex);

  return (
    <div className="App">
      <h1>Note Taking App</h1>
      <NoteForm onAddNote={handleAddNote} />
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <NoteList
        notes={currentNotes}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
      />
      <Pagination
        pageCount={Math.ceil(notes.length / notesPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
