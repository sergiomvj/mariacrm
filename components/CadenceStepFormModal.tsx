import React, { useState, useEffect } from 'react';
import type { CadenceStep } from '../types';
import { CadenceStepType } from '../types';

interface CadenceStepFormModalProps {
    step: CadenceStep | null; // null for new
    onSave: (step: Omit<CadenceStep, 'id'>) => void;
    onClose: () => void;
}

export const CadenceStepFormModal: React.FC<CadenceStepFormModalProps> = ({ step, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        type: CadenceStepType.AUTOMATED_EMAIL,
        delayDays: 1,
        templateName: ''
    });

    useEffect(() => {
        if (step) {
            setFormData({
                type: step.type,
                delayDays: step.delayDays,
                templateName: step.templateName
            });
        }
    }, [step]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'delayDays' ? parseInt(value, 10) : value }));
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
                    <h2 className="text-xl font-bold">{step ? 'Edit Step' : 'Add New Step'}</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-muted-foreground">Step Type</label>
                            <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                {Object.values(CadenceStepType).map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="delayDays" className="block text-sm font-medium text-muted-foreground">Delay (in days)</label>
                            <input type="number" name="delayDays" id="delayDays" min="0" value={formData.delayDays} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label htmlFor="templateName" className="block text-sm font-medium text-muted-foreground">Template Name</label>
                            <input type="text" name="templateName" id="templateName" value={formData.templateName} onChange={handleChange} required className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g., 'Initial Welcome'"/>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-muted">Cancel</button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">{step ? 'Save Changes' : 'Add Step'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};