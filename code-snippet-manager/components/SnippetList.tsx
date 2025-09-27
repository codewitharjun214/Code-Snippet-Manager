
import React from 'react';
import type { Snippet } from '../types';
import SnippetCard from './SnippetCard';

interface SnippetListProps {
  snippets: Snippet[];
  onSelectSnippet: (snippet: Snippet) => void;
  onToggleFavorite: (id: string) => void;
  activeSnippetId?: string | null;
}

const SnippetList: React.FC<SnippetListProps> = ({ snippets, onSelectSnippet, onToggleFavorite, activeSnippetId }) => {
  return (
    <div className="w-96 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/50 flex flex-col">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">All Snippets</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{snippets.length} snippets found</p>
      </div>
      <div className="overflow-y-auto flex-1">
        {snippets.length > 0 ? (
          snippets.map(snippet => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onSelect={onSelectSnippet}
              onToggleFavorite={onToggleFavorite}
              isActive={snippet.id === activeSnippetId}
            />
          ))
        ) : (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            <p>No snippets found.</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnippetList;
