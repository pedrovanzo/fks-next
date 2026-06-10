import type { Folder } from '@/app/types';

export function getDescendantIds(folders: Folder[], rootId: string): Set<string> {
  const result = new Set<string>([rootId]);
  for (const id of result) {
    for (const f of folders) {
      if (f.parentId === id) result.add(f.id);
    }
  }
  return result;
}
