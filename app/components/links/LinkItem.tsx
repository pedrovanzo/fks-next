'use client';

import { Globe, Pencil, Trash2 } from 'lucide-react';
import { getDomain } from '@/app/lib/url';
import type { Link } from '@/app/types';

interface LinkItemProps {
  link: Link;
  onEdit: () => void;
  onDelete: () => void;
}

export function LinkItem({ link, onEdit, onDelete }: LinkItemProps) {
  return (
    <div className="group flex items-start gap-3 py-4 px-3 rounded-xl hover:bg-white dark:hover:bg-neutral-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-neutral-700 hover:shadow-sm">
      <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
        <Globe size={13} className="text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 truncate">
          {getDomain(link.url)}
        </div>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-primary hover:underline font-medium text-base leading-snug mb-0.5 truncate"
          onClick={(e) => e.stopPropagation()}
        >
          {link.title || link.url}
        </a>
        <div className="text-xs text-green-700 dark:text-green-500 mb-1 truncate">
          {link.url}
        </div>
        {link.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {link.description}
          </p>
        )}
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
        <button
          onClick={onEdit}
          className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
          title="Edit"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
