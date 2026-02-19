import { createClient } from '@/utils/supabase/server';
import ClientTable from './ClientTable';

export const metadata = {
  title: 'Clients | Zenith',
};

export default async function ClientsPage() {
  const supabase = await createClient();

  // 1. Obtener los clientes de la base de datos ordenados por los más recientes
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  // 2. Pasar los datos al componente interactivo
  return (
    <ClientTable initialClients={clients || []} />
  );
}