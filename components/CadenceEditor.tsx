import React, { useState } from 'react';
import type { Cadence, CadenceStep } from '../types';
import { CadenceStepType } from '../types';
import { CadenceStepFormModal } from './CadenceStepFormModal';

interface CadenceEditorProps {
    cadence: Cadence;
    onBack: () => void;
    onSave: (cadence: Cadence) => void;
}

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>);
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);

const StepIcon: React.FC<{ type: CadenceStepType }> = ({ type }) => {
    const icons: Record<CadenceStepType, React.ReactNode> = {
        [CadenceStepType.AUTOMATED_EMAIL]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
        [CadenceStepType.MANUAL_EMAIL]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline><path d="M12 13l-2-2-2 2"></path><path d="M12 13l2-2 2 2"></path></svg>,
        [CadenceStepType.CALL_TASK]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
        [CadenceStepType.LINKEDIN_MESSAGE]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
    };
    return <div className="h-6 w-6 text-muted-foreground">{icons[type]}</div>;
}

const CadenceStepCard: React.FC<{ step: CadenceStep; onEdit: () => void; onDelete: () => void; }> = ({ step, onEdit, onDelete }) => (
    <div className="bg-secondary border border-border rounded-lg p-4 flex items-center w-full">
        <div className="p-2 bg-background rounded-full border border-border">
            <StepIcon type={step.type} />
        </div>
        <div className="ml-4 flex-grow">
            <p className="font-semibold">{step.type}</p>
            <p className="text-sm text-muted-foreground">Template: "{step.templateName}"</p>
        </div>
        <div className="text-right mr-4">
             <p className="text-sm font-medium">Wait {step.delayDays} Day{step.delayDays !== 1 ? 's' : ''}</p>
             <p className="text-xs text-muted-foreground">after previous step</p>
        </div>
        <div className="flex gap-2">
            <button onClick={onEdit} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"><EditIcon className="h-4 w-4" /></button>
            <button onClick={onDelete} className="p-1.5 text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/50 rounded-md"><TrashIcon className="h-4 w-4" /></button>
        </div>
    </div>
);

export const CadenceEditor: React.FC<CadenceEditorProps> = ({ cadence, onBack, onSave }) => {
    const [editingCadence, setEditingCadence] = useState<Cadence>(cadence);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepToEdit, setStepToEdit] = useState<CadenceStep | null>(null);

    const handleOpenModalForNew = () => {
        setStepToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (step: CadenceStep) => {
        setStepToEdit(step);
        setIsModalOpen(true);
    };

    const handleDeleteStep = (stepId: string) => {
        if (window.confirm('Are you sure you want to delete this step?')) {
            setEditingCadence(prev => ({
                ...prev,
                steps: prev.steps.filter(s => s.id !== stepId)
            }));
        }
    };

    const handleSaveStep = (step: Omit<CadenceStep, 'id'>) => {
        if (stepToEdit) { // Editing existing step
            setEditingCadence(prev => ({
                ...prev,
                steps: prev.steps.map(s => s.id === stepToEdit.id ? { ...s, ...step } : s)
            }));
        } else { // Adding new step
            const newStep: CadenceStep = {
                id: `cs-${Date.now()}`,
                ...step
            };
            setEditingCadence(prev => ({
                ...prev,
                steps: [...prev.steps, newStep]
            }));
        }
        setIsModalOpen(false);
    };


    return (
        <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
             <header className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
                        &larr; Back to Cadences
                    </button>
                    <h1 className="text-2xl font-bold tracking-tight">{editingCadence.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleOpenModalForNew} className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-md hover:bg-muted/80 transition-colors">
                        Add Step
                    </button>
                    <button onClick={() => onSave(editingCadence)} className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                        Save Changes
                    </button>
                </div>
            </header>

            <div className="mt-6 flex-1 w-full max-w-3xl mx-auto">
                 <div className="space-y-2">
                    {editingCadence.steps.length > 0 ? editingCadence.steps.map((step, index) => (
                       <div key={step.id} className="flex flex-col items-center">
                            <CadenceStepCard 
                                step={step} 
                                onEdit={() => handleOpenModalForEdit(step)}
                                onDelete={() => handleDeleteStep(step.id)}
                            />
                           {index < editingCadence.steps.length - 1 && (
                               <div className="w-px h-8 bg-border my-2" />
                           )}
                       </div>
                    )) : (
                        <div className="text-center py-10 border-2 border-dashed border-border rounded-lg">
                            <p className="text-muted-foreground">This cadence has no steps.</p>
                            <button onClick={handleOpenModalForNew} className="mt-4 text-sm font-semibold text-primary hover:underline">Add the first step</button>
                        </div>
                    )}
                 </div>
            </div>
            {isModalOpen && (
                <CadenceStepFormModal
                    step={stepToEdit}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveStep}
                />
            )}
        </div>
    );
};