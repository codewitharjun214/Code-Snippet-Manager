
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SnippetList from './components/SnippetList';
import SnippetEditor from './components/SnippetEditor';
import { useSnippets } from './hooks/useSnippets';
import type { Snippet } from './types';

type View = 'LIST' | 'EDITOR';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [view, setView] = useState<View>('LIST');
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const {
    addSnippet,
    updateSnippet,
    deleteSnippet,
    toggleFavorite,
    filteredSnippets,
    allTags,
    searchTerm,
    setSearchTerm,
    selectedTags,
    toggleTagFilter,
    selectedLanguage,
    setSelectedLanguage,
    filterFavorites,
    setFilterFavorites,
  } = useSnippets();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const handleSelectSnippet = useCallback((snippet: Snippet) => {
    setActiveSnippet(snippet);
    setView('EDITOR');
  }, []);

  const handleNewSnippet = useCallback(() => {
    setActiveSnippet(null);
    setView('EDITOR');
  }, []);
  
  const handleCloseEditor = useCallback(() => {
    setActiveSnippet(null);
    setView('LIST');
  }, []);

  const handleSaveSnippet = (snippet: Snippet | Omit<Snippet, 'id' | 'createdAt'>) => {
    if ('id' in snippet) {
      updateSnippet(snippet as Snippet);
    } else {
      addSnippet(snippet);
    }
  };
  
  // If the active snippet is filtered out, close the editor
  useEffect(() => {
    if (activeSnippet && !filteredSnippets.find(s => s.id === activeSnippet.id)) {
        handleCloseEditor();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredSnippets, activeSnippet, handleCloseEditor]);
  
  return (
    <div className="h-screen w-screen flex flex-col font-sans text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          allTags={allTags}
          selectedTags={selectedTags}
          toggleTagFilter={toggleTagFilter}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          filterFavorites={filterFavorites}
          setFilterFavorites={setFilterFavorites}
          onNewSnippet={handleNewSnippet}
        />
        <SnippetList
          snippets={filteredSnippets}
          onSelectSnippet={handleSelectSnippet}
          onToggleFavorite={toggleFavorite}
          activeSnippetId={activeSnippet?.id}
        />
        {view === 'EDITOR' && (
          <SnippetEditor
            snippet={activeSnippet}
            onSave={handleSaveSnippet}
            onDelete={deleteSnippet}
            onClose={handleCloseEditor}
          />
        )}
        {view === 'LIST' && !activeSnippet && (
            <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900/70">
                <div className="text-center text-slate-500 dark:text-slate-400">
                    <h2 className="text-xl font-semibold">Select a snippet to view</h2>
                    <p>or create a new one to get started.</p>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;
