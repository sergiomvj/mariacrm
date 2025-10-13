import React, { useState, useEffect } from 'react';
import type { Lead } from '../types';
import { LeadStatus, LeadPriority } from '../types';
import { MOCK_USER } from '../constants';

interface LeadFormModalProps {
    lead: Lead | null; // null for new lead, Lead object for editing
    onSave: (lead: Lead) => void;
    onClose: () => void;
}

const initialFormData = {
    name: '',
    company: '',
    avatarUrl: `https://i.pravatar.cc/150?u=${Math.random()}`,
    status: LeadStatus.NEW,
    priority: LeadPriority.MEDIUM,
    score: 50,
    email: '',
    phone: '',
    linkedin: '',
    companyWebsite: '',
    companyIndustry: '',
    leadSource: '',
    owner: MOCK_USER.name,
    tags: [] as string[],
};

type FormData = Omit<Lead, 'id' | 'lastContacted'>;


export const LeadFormModal: React.FC<LeadFormModalProps> = ({ lead, onSave, onClose }) => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [tagsInput, setTagsInput] = useState('');

    useEffect(() => {
        if (lead) {
            setFormData({
                name: lead.name,
                company: lead.company,
                avatarUrl: lead.avatarUrl,
                status: lead.status,
                priority: lead.priority,
                score: lead.score,
                email: lead.email,
                phone: lead.phone,
                linkedin: lead.linkedin || '',
                companyWebsite: lead.companyWebsite || '',
                companyIndustry: lead.companyIndustry || '',
                leadSource: lead.leadSource || '',
                owner: lead.owner,
                tags: lead.tags,
            });
            setTagsInput(lead.tags.join(', '));
        } else {
            setFormData(initialFormData);
            setTagsInput('');
        }
    }, [lead]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'score' ? parseInt(value, 10) : value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
        const leadToSave: Lead = {
            id: lead?.id || `lead-${Date.now()}`,
            lastContacted: new Date().toISOString().split('T')[0], // Set to today
            ...formData,
            tags,
        };
        onSave(leadToSave);
    };

    return (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
            <div 
              className="bg-card border border-border rounded-lg shadow-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit} className="p-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">{lead ? 'Edit Lead' : 'Add New Lead'}</h2>
                        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">&times;</button>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Full Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-muted-foreground">Company</label>
                                <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">Email</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground">Phone</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="linkedin" className="block text-sm font-medium text-muted-foreground">LinkedIn Profile</label>
                                <input type="text" name="linkedin" id="linkedin" value={formData.linkedin} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" placeholder="linkedin.com/in/username"/>
                            </div>
                            <div>
                                <label htmlFor="companyWebsite" className="block text-sm font-medium text-muted-foreground">Company Website</label>
                                <input type="text" name="companyWebsite" id="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" placeholder="example.com" />
                            </div>
                             <div>
                                <label htmlFor="companyIndustry" className="block text-sm font-medium text-muted-foreground">Industry</label>
                                <input type="text" name="companyIndustry" id="companyIndustry" value={formData.companyIndustry} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="leadSource" className="block text-sm font-medium text-muted-foreground">Lead Source</label>
                                <input type="text" name="leadSource" id="leadSource" value={formData.leadSource} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-muted-foreground">Status</label>
                                <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                    {Object.values(LeadStatus).map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-muted-foreground">Priority</label>
                                <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                    {Object.values(LeadPriority).map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-muted-foreground">Tags</label>
                            <input type="text" name="tags" id="tags" value={tagsInput} onChange={handleTagsChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g., High Priority, SaaS, Follow-up"/>
                            <p className="text-xs text-muted-foreground mt-1">Separate tags with a comma.</p>
                        </div>

                        <div>
                            <label htmlFor="score" className="block text-sm font-medium text-muted-foreground">Score ({formData.score})</label>
                            <input type="range" name="score" id="score" min="0" max="100" value={formData.score} onChange={handleChange} className="mt-1 block w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-muted">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">{lead ? 'Save Changes' : 'Create Lead'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};