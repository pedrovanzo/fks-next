import ReactMarkdown from 'react-markdown';

interface TodoNoteProps {
  content: string;
}

export function TodoNote({ content }: TodoNoteProps) {
  return (
    <div className="rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 px-5 py-4 text-sm">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-3 mb-1 first:mt-0">
              {children}
            </h2>
          ),
          p: ({ children }) => (
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-1">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-0.5 text-gray-600 dark:text-gray-400 mb-1">
              {children}
            </ul>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
