
import React, { useEffect } from 'react';
// A lightweight code editor with syntax highlighting
// Using this directly is simpler than a full-blown Monaco editor setup
// The library itself isn't included, but the code acts as if it is.
// A simple textarea will fallback if this component doesn't load.
// In this implementation, we will use a real library for better UX.
// To use it, you'd typically run: npm install react-simple-code-editor prismjs
import Editor from 'react-simple-code-editor';

// This is a simplified way to get Prism. In a real app, you might import languages
declare var Prism: any;

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange, language }) => {
  useEffect(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }, [code, language]);

  const highlight = (codeToHighlight: string) => {
    if (typeof Prism !== 'undefined' && Prism.languages[language]) {
      return Prism.highlight(codeToHighlight, Prism.languages[language], language);
    }
    return codeToHighlight; // fallback
  };

  return (
    <div className="code-editor-container relative bg-[#2d2d2d] rounded-lg overflow-hidden text-sm h-full">
      {typeof Editor !== 'undefined' ? (
        <Editor
            value={code}
            onValueChange={onCodeChange}
            highlight={highlight}
            padding={16}
            className="code-editor font-mono h-full"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: '300px'
            }}
          />
        ) : (
          <textarea 
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className="w-full h-full p-4 bg-transparent text-white font-mono"
            style={{ minHeight: '300px' }}
          />
        )
      }
    </div>
  );
};

export default CodeEditor;
