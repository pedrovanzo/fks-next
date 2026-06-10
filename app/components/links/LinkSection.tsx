import { LinkItem } from './LinkItem';
import type { Link } from '@/app/types';

interface LinkSectionProps {
  links: Link[];
  hasFolders: boolean;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
}

export function LinkSection({ links, hasFolders, onEdit, onDelete }: LinkSectionProps) {
  return (
    <section>
      {hasFolders && (
        <div className="border-t border-gray-100 dark:border-neutral-800 mb-5" />
      )}
      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
        Links
      </p>
      <div className="flex flex-col">
        {links.map((link) => (
          <LinkItem
            key={link.id}
            link={link}
            onEdit={() => onEdit(link)}
            onDelete={() => onDelete(link)}
          />
        ))}
      </div>
    </section>
  );
}
