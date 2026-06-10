import { SessionItem } from './SessionItem';
import type { Session } from '@/app/types';

interface SessionSectionProps {
  sessions: Session[];
  linkCounts: Record<string, number>;
  hasFolders: boolean;
  onOpen: (id: string) => void;
  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;
}

export function SessionSection({
  sessions,
  linkCounts,
  hasFolders,
  onOpen,
  onEdit,
  onDelete,
}: SessionSectionProps) {
  return (
    <section>
      {hasFolders && (
        <div className="border-t border-gray-100 dark:border-neutral-800 mb-5" />
      )}
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
        Sessions
      </p>
      <div className="flex flex-col">
        {sessions.map((session) => (
          <SessionItem
            key={session.id}
            session={session}
            linkCount={linkCounts[session.id] ?? 0}
            onOpen={() => onOpen(session.id)}
            onEdit={() => onEdit(session)}
            onDelete={() => onDelete(session)}
          />
        ))}
      </div>
    </section>
  );
}
