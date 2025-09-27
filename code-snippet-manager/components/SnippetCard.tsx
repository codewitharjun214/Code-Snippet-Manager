
import React from 'react';
import type { Snippet } from '../types';
import { StarIcon } from './icons';

interface SnippetCardProps {
  snippet: Snippet;
  onSelect: (snippet: Snippet) => void;
  onToggleFavorite: (id: string) => void;
  isActive: boolean;
}

const SnippetCard: React.FC<SnippetCardProps> = ({ snippet, onSelect, onToggleFavorite, isActive }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(snippet.id);
  };
  
  return (
    <div
      onClick={() => onSelect(snippet)}
      className={`p-4 border-l-4 cursor-pointer transition-colors ${
        isActive
          ? 'bg-slate-200 dark:bg-slate-700/50 border-indigo-500'
          : 'bg-slate-100 dark:bg-slate-800 border-transparent hover:bg-slate-200/70 dark:hover:bg-slate-700/30'
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">{snippet.title}</h3>
        <button onClick={handleFavoriteClick} className={`p-1 rounded-full group transition-colors ${snippet.isFavorite ? 'text-amber-500' : 'text-slate-400 hover:text-amber-400'}`}>
          <StarIcon className={`w-5 h-5 ${snippet.isFavorite ? 'fill-current' : 'group-hover:fill-current'}`} />
        </button>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">{snippet.description}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">{snippet.language}</span>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {new Date(snippet.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default SnippetCard;
