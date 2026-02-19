"use client";

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { MoreHorizontal, Calendar, GripVertical, Plus } from 'lucide-react';
import { updateProjectStatus, createQuickProject } from './actions';

type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
type Status = 'Backlog' | 'In Progress' | 'In Review' | 'Done';

interface Project {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  due_date: string | null;
  clients?: { name: string } | null; // Relación con la tabla clients
}

const COLUMNS: Status[] = ['Backlog', 'In Progress', 'In Review', 'Done'];

const priorityStyles: Record<Priority, string> = {
  Low: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  Medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Urgent: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function KanbanClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isMounted, setIsMounted] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setProjects(initialProjects);
  }, [initialProjects]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as Status;

    // 1. Optimistic UI Update (Actualizamos la interfaz al instante)
    const updatedProjects = projects.map(p => 
      p.id === draggableId ? { ...p, status: newStatus } : p
    );
    setProjects(updatedProjects);

    // 2. Server Action (Guardamos en la base de datos en segundo plano)
    try {
      await updateProjectStatus(draggableId, newStatus);
    } catch (error) {
      // Si falla el servidor, revertimos al estado original
      setProjects(initialProjects);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100">Kanban Board</h1>
          <p className="text-zinc-400 mt-1">Manage your development workflows and track progress.</p>
        </div>
        <button 
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="flex items-center gap-2 px-4 py-2 bg-zenith-accent hover:bg-zenith-accent-hover text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20"
        >
          {isAddingTask ? 'Cancel' : <><Plus size={16} /> New Task</>}
        </button>
      </div>

      {/* Quick Add Form */}
      {isAddingTask && (
        <form action={async (formData) => {
          await createQuickProject(formData);
          setIsAddingTask(false);
        }} className="glass-panel p-4 flex gap-4 items-end max-w-2xl">
          <div className="flex-1 space-y-1">
            <label className="text-xs text-zinc-400">Task Title</label>
            <input name="title" required className="w-full bg-zenith-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zenith-accent" placeholder="e.g. Optimize Core Web Vitals" />
          </div>
          <div className="w-48 space-y-1">
            <label className="text-xs text-zinc-400">Priority</label>
            <select name="priority" className="w-full bg-zenith-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zenith-accent">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <button type="submit" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors h-[38px]">
            Add to Backlog
          </button>
        </form>
      )}

      {/* Board Layout */}
      <div className="flex-1 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex items-start gap-6 h-full min-w-max">
            {COLUMNS.map((status) => {
              const columnTasks = projects.filter(p => p.status === status);

              return (
                <div key={status} className="w-80 flex flex-col glass-panel max-h-[calc(100vh-12rem)]">
                  {/* Column Header */}
                  <div className="p-4 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-zinc-100">{status}</h2>
                      <span className="flex items-center justify-center px-2 h-6 rounded-full bg-white/5 text-xs font-medium text-zinc-400">
                        {columnTasks.length}
                      </span>
                    </div>
                    <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  {/* Droppable Area */}
                  <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 overflow-y-auto p-3 space-y-3 transition-colors ${
                          snapshot.isDraggingOver ? 'bg-white/[0.02]' : ''
                        }`}
                      >
                        {columnTasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`group p-4 rounded-xl bg-zenith-surface border border-white/10 flex flex-col gap-3 transition-all ${
                                  snapshot.isDragging ? 'shadow-2xl shadow-black/50 ring-1 ring-zenith-accent rotate-2' : 'hover:border-white/20'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <div 
                                    {...provided.dragHandleProps} 
                                    className="mt-0.5 text-zinc-600 group-hover:text-zinc-400 cursor-grab active:cursor-grabbing transition-colors"
                                  >
                                    <GripVertical size={16} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-medium text-zinc-500 mb-1">
                                      {task.clients?.name || 'Internal Agency Task'}
                                    </p>
                                    <h3 className="text-sm font-semibold text-zinc-200 leading-snug">{task.title}</h3>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between pl-6">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${priorityStyles[task.priority]}`}>
                                    {task.priority}
                                  </span>
                                  {task.due_date && (
                                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                      <Calendar size={12} />
                                      <span>{new Date(task.due_date).toLocaleDateString()}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}