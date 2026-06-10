'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import type { Folder } from '@/app/types';

interface FolderFormModalProps {
  mode: 'create' | 'edit';
  folder?: Folder;
  onSave: (name: string) => void;
  onClose: () => void;
}

export function FolderFormModal({ mode, folder, onSave, onClose }: FolderFormModalProps) {
  const [name, setName] = useState(folder?.name ?? '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Folder name is required');
      return;
    }
    onSave(trimmed);
    onClose();
  };

  return (
    <Modal title={mode === 'create' ? 'New Folder' : 'Rename Folder'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Folder name
          </label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="e.g. Work, Personal, Research…"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            {mode === 'create' ? 'Create' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
