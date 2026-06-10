export const ROOT_ID = 'root' as const;

export interface Folder {
  id: string;
  name: string;
  parentId: string;
  createdAt: string;
}

export interface Session {
  id: string;
  name: string;
  folderId: string;
  createdAt: string;
}

export interface Link {
  id: string;
  parentType: 'folder' | 'session';
  parentId: string;
  title?: string;
  url: string;
  description?: string;
  createdAt: string;
}
