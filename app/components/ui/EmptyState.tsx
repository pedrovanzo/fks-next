import { BookMarked } from 'lucide-react';

interface EmptyStateProps {
  context: 'folder' | 'session';
  isNested: boolean;
}

export function EmptyState({ context, isNested }: EmptyStateProps) {
  const heading =
    context === 'session'
      ? 'No links yet'
      : isNested
      ? 'This folder is empty'
      : 'Nothing here yet';

  const body =
    context === 'session'
      ? 'Add a link to this session to get started.'
      : 'Create a folder, a session, or add a link directly here.';

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-28 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
        <BookMarked size={28} className="text-gray-300 dark:text-gray-600" />
      </div>
      <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {heading}
      </h3>
      <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">{body}</p>
    </div>
  );
}
