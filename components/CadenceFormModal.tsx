import React, { useState } from 'react';
import type { Cadence } from '../types';

interface CadenceFormModalProps {
    onSave: (cadenceData: Omit<Cadence, 'id' | 'steps' | 'active'>) => void;
    onClose: () => void;
}

export const CadenceFormModal: React.FC<CadenceFormModalProps> = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        targetSegment: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.targetSegment) {
            alert('Please fill out all fields.');
            return;
        }
        onSave(formData);
    };

    return (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
            <div 
              className="bg-card border border-border rounded-lg shadow-xl w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Create New Cadence</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Cadence Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g., Inbound SMB Leads" />
                        </div>
                        <div>
                            <label htmlFor="targetSegment" className="block text-sm font-medium text-muted-foreground">Target Segment</label>
                            <input type="text" name="targetSegment" id="targetSegment" value={formData.targetSegment} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g., SMB, <50 Employees" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-muted">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">Create Cadence</button>
                    </div>
                </form>
            </div>
        </div>
    );
};