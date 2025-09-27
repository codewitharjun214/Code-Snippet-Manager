
import React, { useState } from 'react';
import { XIcon } from './icons';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center p-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 bg-indigo-200 dark:bg-indigo-500/50 text-indigo-800 dark:text-indigo-100 text-sm font-medium px-2 py-1 rounded-full">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-indigo-600 dark:text-indigo-200 hover:text-indigo-800 dark:hover:text-indigo-50">
              <XIcon className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag..."
          className="flex-1 bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none min-w-[100px]"
        />
      </div>
    </div>
  );
};

export default TagInput;
