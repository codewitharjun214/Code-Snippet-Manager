
import { useState, useMemo, useCallback } from 'react';
import type { Snippet } from '../types';
import { mockSnippets } from '../data/mockSnippets';

export const useSnippets = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(mockSnippets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [filterFavorites, setFilterFavorites] = useState(false);

  const addSnippet = (snippet: Omit<Snippet, 'id' | 'createdAt'>) => {
    const newSnippet: Snippet = {
      ...snippet,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setSnippets(prev => [newSnippet, ...prev]);
  };

  const updateSnippet = (updatedSnippet: Snippet) => {
    setSnippets(prev => 
      prev.map(s => s.id === updatedSnippet.id ? updatedSnippet : s)
    );
  };

  const deleteSnippet = (id: string) => {
    setSnippets(prev => prev.filter(s => s.id !== id));
  };
  
  const toggleFavorite = useCallback((id: string) => {
    setSnippets(prev =>
      prev.map(s =>
        s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
      )
    );
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    snippets.forEach(snippet => {
      snippet.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [snippets]);

  const filteredSnippets = useMemo(() => {
    return snippets.filter(snippet => {
      const searchMatch =
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchTerm.toLowerCase());

      const languageMatch =
        selectedLanguage === 'all' || snippet.language === selectedLanguage;

      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every(tag => snippet.tags.includes(tag));

      const favoriteMatch = !filterFavorites || snippet.isFavorite;

      return searchMatch && languageMatch && tagsMatch && favoriteMatch;
    });
  }, [snippets, searchTerm, selectedLanguage, selectedTags, filterFavorites]);

  const toggleTagFilter = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return {
    snippets,
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
  };
};
