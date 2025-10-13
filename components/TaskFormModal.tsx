import React, { useState, useEffect } from 'react';
import type { Task } from '../types';
import { TaskStatus } from '../types';
import { TEAM_MEMBERS, MOCK_USER, LEADS } from '../constants';

interface TaskFormModalProps {
    task?: Task | null; // null for new, Task object for editing
    leadId?: string | null; // Pre-filled if creating from a lead
    onSave: (task: Task) => void;
    onClose: () => void;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

export const TaskFormModal: React.FC<TaskFormModalProps> = ({ task, leadId, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        leadId: leadId || null,
        assigneeId: MOCK_USER.id,
        dueDate: getTodayString(),
        status: TaskStatus.TODO,
        notes: '',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                leadId: task.leadId,
                assigneeId: task.assigneeId,
                dueDate: task.dueDate,
                status: task.status,
                notes: task.notes || '',
            });
        }
    }, [task]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const taskToSave: Task = {
            id: task?.id || `task-${Date.now()}`,
            ...formData,
        };
        onSave(taskToSave);
        onClose();
    };

    return (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
            <div 
              className="bg-card border border-border rounded-lg shadow-xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{task ? 'Edit Task' : 'Create New Task'}</h2>
                        <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">&times;</button>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-muted-foreground">Title</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="assigneeId" className="block text-sm font-medium text-muted-foreground">Assign To</label>
                                <select name="assigneeId" id="assigneeId" value={formData.assigneeId} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                    {TEAM_MEMBERS.map(member => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="leadId" className="block text-sm font-medium text-muted-foreground">Related Lead</label>
                                <select name="leadId" id="leadId" value={formData.leadId || ''} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                    <option value="">None</option>
                                    {LEADS.map(lead => (
                                        <option key={lead.id} value={lead.id}>{lead.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium text-muted-foreground">Due Date</label>
                                <input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                             <div>
                                <label htmlFor="status" className="block text-sm font-medium text-muted-foreground">Status</label>
                                <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                    {Object.values(TaskStatus).map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                             <label htmlFor="notes" className="block text-sm font-medium text-muted-foreground">Notes</label>
                             <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-muted">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">{task ? 'Save Changes' : 'Create Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};