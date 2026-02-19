import { createClient } from '@/utils/supabase/server';
import DashboardClient from './DashboardClient';

export const metadata = {
  title: 'Dashboard | Zenith',
};

export default async function DashboardHome() {
  const supabase = await createClient();

  // 1. Contar el total de clientes exacto
  const { count: totalClients } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true });

  // 2. Contar los proyectos activos (que no estén en 'Done')
  const { count: activeProjects } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .neq('status', 'Done');

  // 3. Obtener las próximas 4 tareas que tengan fecha de entrega
  const { data: upcomingTasks } = await supabase
    .from('projects')
    .select('id, title, due_date, priority, clients(name)')
    .neq('status', 'Done')
    .not('due_date', 'is', null)
    .order('due_date', { ascending: true })
    .limit(4);

  return (
    <DashboardClient 
      totalClients={totalClients || 0} 
      activeProjects={activeProjects || 0}
      upcomingTasks={upcomingTasks || []}
    />
  );
}
