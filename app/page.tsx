import { readFile } from 'fs/promises';
import path from 'path';
import { LinkManager } from '@/app/components/LinkManager';
import { TodoNote } from '@/app/components/dev/TodoNote';

export default async function Home() {
  const todoContent = await readFile(
    path.join(process.cwd(), 'todo.md'),
    'utf-8'
  );

  return <LinkManager noteSlot={<TodoNote content={todoContent} />} />;
}
