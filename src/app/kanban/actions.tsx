'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProjectStatus(projectId: string, newStatus: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('projects')
    .update({ status: newStatus })
    .eq('id', projectId)

  if (error) {
    console.error("Error updating status:", error)
    throw new Error("Failed to update status")
  }
}

export async function createQuickProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const title = formData.get('title') as string
  const priority = formData.get('priority') as string

  const { error } = await supabase.from('projects').insert({
    profile_id: user.id,
    title,
    status: 'Backlog', // Por defecto entra al Backlog
    priority: priority || 'Medium',
  })

  if (error) {
    console.error("Error creating project:", error)
    return { error: error.message }
  }

  revalidatePath('/kanban')
}