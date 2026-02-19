import { createClient } from '@/utils/supabase/server';
import KanbanClient from './KanbanClient';

export const metadata = {
  title: 'Kanban Board | Zenith',
};

export default async function KanbanPage() {
  const supabase = await createClient();

  // Obtenemos los proyectos y hacemos un join automático con la tabla de clientes
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      status,
      priority,
      due_date,
      clients ( name )
    `)
    .order('created_at', { ascending: false });

  return (
    <KanbanClient initialProjects={projects || []} />
  );
}