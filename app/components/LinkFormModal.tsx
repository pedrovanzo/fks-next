'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import type { Link } from '@/app/types';

interface LinkFormModalProps {
  mode: 'create' | 'edit';
  link?: Link;
  onSave: (data: { title?: string; url: string; description?: string }) => void;
  onClose: () => void;
}

export function LinkFormModal({ mode, link, onSave, onClose }: LinkFormModalProps) {
  const [url, setUrl] = useState(link?.url ?? '');
  const [title, setTitle] = useState(link?.title ?? '');
  const [description, setDescription] = useState(link?.description ?? '');
  const [urlError, setUrlError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setUrlError('URL is required');
      return;
    }
    onSave({
      url: trimmedUrl,
      title: title.trim() || undefined,
      description: description.trim() || undefined,
    });
    onClose();
  };

  return (
    <Modal title={mode === 'create' ? 'New Link' : 'Edit Link'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            URL <span className="text-red-500">*</span>
          </label>
          <input
            autoFocus
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setUrlError('');
            }}
            placeholder="https://example.com"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
          />
          {urlError && <p className="text-xs text-red-500">{urlError}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Title{' '}
            <span className="text-xs font-normal text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My awesome link"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Description{' '}
            <span className="text-xs font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this link about?"
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none transition-colors"
          />
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
            {mode === 'create' ? 'Add Link' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
