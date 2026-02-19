'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createClientAction(formData: FormData) {
  const supabase = await createClient()
  
  // Obtener el usuario actual
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("No autorizado")

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string

  // Insertar en Supabase (Las RLS garantizan que solo el usuario vea este cliente)
  const { error } = await supabase.from('clients').insert({
    profile_id: user.id,
    name,
    email,
    company,
  })

  if (error) {
    console.error("Error al crear cliente:", error)
    return { error: error.message }
  }

  // Refrescar la página de clientes para mostrar el nuevo dato
  revalidatePath('/clients')
}