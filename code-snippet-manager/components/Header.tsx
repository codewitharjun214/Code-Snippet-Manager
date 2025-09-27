
import React from 'react';
import { MoonIcon, SunIcon, SearchIcon } from './icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-slate-200 dark:bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-300 dark:border-slate-700/50 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
        Code<span className="text-indigo-500">Snippets</span>
      </h1>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-200 dark:focus:ring-offset-slate-800 focus:ring-indigo-500"
        >
          {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
