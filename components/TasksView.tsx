import React, { useState, useMemo } from 'react';
import { TEAM_MEMBERS, LEADS } from '../constants';
import type { Task, Lead, TeamMember } from '../types';
import { TaskStatus } from '../types';
import { TaskFormModal } from './TaskFormModal';


const TaskCard: React.FC<{ task: Task; onEdit: () => void }> = ({ task, onEdit }) => {
    const assignee = useMemo(() => TEAM_MEMBERS.find(m => m.id === task.assigneeId), [task.assigneeId]);
    const lead = useMemo(() => task.leadId ? LEADS.find(l => l.id === task.leadId) : null, [task.leadId]);

    return (
        <div onClick={onEdit} className="bg-secondary p-4 rounded-lg border border-border cursor-pointer hover:border-primary/50">
            <h3 className="font-semibold">{task.title}</h3>
            {lead && (
                <p className="text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded-full inline-block mt-2">
                    {lead.name}
                </p>
            )}
            <p className="text-sm text-muted-foreground mt-2">{task.notes}</p>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                    {assignee && <img src={assignee.avatarUrl} alt={assignee.name} className="h-6 w-6 rounded-full" title={assignee.name} />}
                    <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                </div>
            </div>
        </div>
    );
};

const TaskColumn: React.FC<{ title: TaskStatus; tasks: Task[]; onEditTask: (task: Task) => void }> = ({ title, tasks, onEditTask }) => (
    <div className="w-full md:w-1/3 flex flex-col">
        <h2 className="text-lg font-semibold px-2 mb-4">{title} ({tasks.length})</h2>
        <div className="flex-1 bg-card/50 p-2 rounded-lg border border-border space-y-3 overflow-y-auto">
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} onEdit={() => onEditTask(task)} />
            ))}
        </div>
    </div>
);


interface TasksViewProps {
    tasks: Task[];
    onSaveTask: (task: Task) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks, onSaveTask }) => {
    const [editingTask, setEditingTask] = useState<Task | null | undefined>(undefined); // null for new, Task for edit

    const tasksByStatus = useMemo(() => {
        return tasks.reduce((acc, task) => {
            acc[task.status] = acc[task.status] || [];
            acc[task.status].push(task);
            return acc;
        }, {} as Record<TaskStatus, Task[]>);
    }, [tasks]);

    return (
        <>
            <div className="flex-1 p-6 md:p-8 flex flex-col h-full">
                {/* Header */}
                <header className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
                        <p className="text-muted-foreground">Manage your team's workload and stay on top of deadlines.</p>
                    </div>
                    <button onClick={() => setEditingTask(null)} className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        Create Task
                    </button>
                </header>

                {/* Kanban Board */}
                <div className="mt-6 flex-1 flex flex-col md:flex-row gap-6 overflow-x-auto">
                    <TaskColumn 
                        title={TaskStatus.TODO} 
                        tasks={tasksByStatus[TaskStatus.TODO] || []}
                        onEditTask={(task) => setEditingTask(task)}
                    />
                    <TaskColumn 
                        title={TaskStatus.IN_PROGRESS} 
                        tasks={tasksByStatus[TaskStatus.IN_PROGRESS] || []}
                        onEditTask={(task) => setEditingTask(task)}
                    />
                    <TaskColumn 
                        title={TaskStatus.DONE} 
                        tasks={tasksByStatus[TaskStatus.DONE] || []}
                        onEditTask={(task) => setEditingTask(task)}
                    />
                </div>
            </div>
            
            {editingTask !== undefined && (
                <TaskFormModal 
                    task={editingTask} 
                    onSave={onSaveTask}
                    onClose={() => setEditingTask(undefined)} 
                />
            )}
        </>
    );
};
