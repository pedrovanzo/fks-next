'use client';

import { BookMarked, ChevronRight } from 'lucide-react';

interface AppHeaderProps {
  path: Array<{ id: string; name: string }>;
  onNavigate: (index: number) => void;
  sessionName?: string;
}

export function AppHeader({ path, onNavigate, sessionName }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800">
      <div className="px-4 sm:px-6 h-14 flex items-center gap-2">
        <button
          onClick={() => onNavigate(-1)}
          className="flex items-center gap-2 shrink-0 hover:opacity-75 transition-opacity"
        >
          <BookMarked size={20} className="text-primary" />
          <span className="font-bold text-lg text-gray-900 dark:text-gray-100 tracking-tight">
            fksalink
          </span>
        </button>

        {path.map((item, index) => (
          <span key={item.id} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />
            <button
              onClick={() => onNavigate(index)}
              className={
                index === path.length - 1 && !sessionName
                  ? 'font-semibold text-gray-700 dark:text-gray-200 cursor-default truncate max-w-[160px]'
                  : 'hover:text-primary transition-colors truncate max-w-[160px]'
              }
            >
              {item.name}
            </button>
          </span>
        ))}

        {sessionName && (
          <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <ChevronRight size={14} className="text-gray-300 dark:text-gray-600 shrink-0" />
            <span className="font-semibold text-gray-700 dark:text-gray-200 truncate max-w-[160px]">
              {sessionName}
            </span>
          </span>
        )}
      </div>
    </header>
  );
}
