'use client';

import { Layers, Pencil, Trash2 } from 'lucide-react';
import type { Session } from '@/app/types';

interface SessionItemProps {
  session: Session;
  linkCount: number;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SessionItem({ session, linkCount, onOpen, onEdit, onDelete }: SessionItemProps) {
  return (
    <div
      onClick={onOpen}
      className="group flex items-center gap-3 py-3 px-3 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-neutral-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-neutral-700 hover:shadow-sm"
    >
      <div className="shrink-0 w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
        <Layers size={16} className="text-indigo-400 dark:text-indigo-300" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
          {session.name}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {linkCount} {linkCount === 1 ? 'link' : 'links'}
        </p>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
          title="Rename"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
