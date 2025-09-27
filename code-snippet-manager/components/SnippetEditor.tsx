
import React, { useState, useEffect } from 'react';
import type { Snippet } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import CodeEditor from './CodeEditor';
import TagInput from './TagInput';
import { TrashIcon, StarIcon } from './icons';

interface SnippetEditorProps {
  snippet: Snippet | null;
  onSave: (snippet: Snippet | Omit<Snippet, 'id' | 'createdAt'>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const SnippetEditor: React.FC<SnippetEditorProps> = ({ snippet, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title);
      setDescription(snippet.description);
      setLanguage(snippet.language);
      setCode(snippet.code);
      setTags(snippet.tags);
      setIsFavorite(snippet.isFavorite);
    } else {
      // Reset for new snippet
      setTitle('');
      setDescription('');
      setLanguage('javascript');
      setCode('');
      setTags([]);
      setIsFavorite(false);
    }
  }, [snippet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return; // Basic validation
    
    if (snippet) {
      onSave({ ...snippet, title, description, language, code, tags, isFavorite });
    } else {
      onSave({ title, description, language, code, tags, isFavorite });
    }
    onClose();
  };
  
  const handleDelete = () => {
    if (snippet && window.confirm('Are you sure you want to delete this snippet?')) {
      onDelete(snippet.id);
      onClose();
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-slate-50 dark:bg-slate-900/70 overflow-y-auto">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {snippet ? 'Edit Snippet' : 'Create New Snippet'}
          </h2>
          <div>
            {snippet && (
              <button
                type="button"
                onClick={handleDelete}
                className="p-2 rounded-md text-slate-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition-colors mr-2"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            )}
            <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-md transition-colors ${isFavorite ? 'text-amber-500' : 'text-slate-400 hover:text-amber-400'}`}
              >
                <StarIcon className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            <button type="button" onClick={onClose} className="ml-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Cancel</button>
            <button type="submit" className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              Save Snippet
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <input
            type="text"
            placeholder="Snippet Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg p-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full p-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Tags</label>
              <TagInput tags={tags} setTags={setTags} />
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
           <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Code</label>
           <div className="flex-1">
             <CodeEditor code={code} onCodeChange={setCode} language={language} />
           </div>
        </div>
      </form>
    </div>
  );
};

export default SnippetEditor;
