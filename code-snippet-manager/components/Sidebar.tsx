
import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { StarIcon, PlusIcon } from './icons';

interface SidebarProps {
  allTags: string[];
  selectedTags: string[];
  toggleTagFilter: (tag: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  filterFavorites: boolean;
  setFilterFavorites: (fav: boolean) => void;
  onNewSnippet: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  allTags,
  selectedTags,
  toggleTagFilter,
  selectedLanguage,
  setSelectedLanguage,
  filterFavorites,
  setFilterFavorites,
  onNewSnippet
}) => {
  return (
    <aside className="w-64 p-4 space-y-6 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/50">
      <button 
        onClick={onNewSnippet}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-indigo-500">
        <PlusIcon className="w-5 h-5" />
        New Snippet
      </button>

      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">LANGUAGE</h3>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="all">All Languages</option>
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>

       <div>
        <button onClick={() => setFilterFavorites(!filterFavorites)} className={`w-full flex items-center gap-2 p-2 rounded-md text-left transition-colors ${filterFavorites ? 'bg-amber-400/20 text-amber-500' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
           <StarIcon className={`w-5 h-5 ${filterFavorites ? 'fill-current' : ''}`} />
           <span>Favorites</span>
        </button>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">TAGS</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTagFilter(tag)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
