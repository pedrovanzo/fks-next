'use client';

import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  path: Array<{ id: string; name: string }>;
  onNavigate: (index: number) => void;
}

export function Breadcrumbs({ path, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
      <button
        onClick={() => onNavigate(-1)}
        className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
      >
        <Home size={14} />
        <span>Home</span>
      </button>
      {path.map((item, index) => (
        <span key={item.id} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
          <button
            onClick={() => onNavigate(index)}
            className={
              index === path.length - 1
                ? 'font-semibold text-gray-900 dark:text-gray-100 cursor-default'
                : 'hover:text-primary transition-colors'
            }
          >
            {item.name}
          </button>
        </span>
      ))}
    </nav>
  );
}
