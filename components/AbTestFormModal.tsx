import React, { useState } from 'react';
import type { AbTest } from '../types';

interface AbTestFormModalProps {
    onSave: (test: Omit<AbTest, 'id' | 'status' | 'metrics' | 'totalParticipants'>) => void;
    onClose: () => void;
}

export const AbTestFormModal: React.FC<AbTestFormModalProps> = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        entity: 'Email Subject' as AbTest['entity'],
        variantA: '',
        variantB: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                    <h2 className="text-xl font-bold">Create New A/B Test</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Test Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g., Q4 Welcome Email"/>
                        </div>
                        <div>
                            <label htmlFor="entity" className="block text-sm font-medium text-muted-foreground">Entity to Test</label>
                            <select name="entity" id="entity" value={formData.entity} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                <option value="Email Subject">Email Subject</option>
                                <option value="Cadence Step">Cadence Step</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="variantA" className="block text-sm font-medium text-muted-foreground">Variant A</label>
                            <input type="text" name="variantA" id="variantA" value={formData.variantA} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                         <div>
                            <label htmlFor="variantB" className="block text-sm font-medium text-muted-foreground">Variant B</label>
                            <input type="text" name="variantB" id="variantB" value={formData.variantB} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-muted">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">Create Test</button>
                    </div>
                </form>
            </div>
        </div>
    );
};