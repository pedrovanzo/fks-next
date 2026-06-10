'use client';

import { TriangleAlert } from 'lucide-react';
import { Modal } from './Modal';

interface DeleteConfirmModalProps {
  type: 'folder' | 'link';
  name: string;
  hasChildren?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirmModal({
  type,
  name,
  hasChildren,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  return (
    <Modal title="Confirm Delete" onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 items-start">
          <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
            <TriangleAlert size={18} className="text-red-500" />
          </div>
          <div className="pt-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Delete <strong className="font-semibold">{name}</strong>?
            </p>
            {type === 'folder' && hasChildren && (
              <p className="mt-1 text-xs text-red-500">
                All subfolders and links inside will be permanently deleted.
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
