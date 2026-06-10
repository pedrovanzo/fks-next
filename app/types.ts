export const ROOT_ID = 'root' as const;

export interface Folder {
  id: string;
  name: string;
  parentId: string;
  createdAt: string;
}

export interface Link {
  id: string;
  folderId: string;
  title?: string;
  url: string;
  description?: string;
  createdAt: string;
}
