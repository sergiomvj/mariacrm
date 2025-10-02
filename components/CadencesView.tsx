import React, { useState } from 'react';
import { CADENCES } from '../constants';
import type { Cadence } from '../types';
import { CadenceEditor } from './CadenceEditor';
import { CadenceFormModal } from './CadenceFormModal';

const StatusBadge: React.FC<{ active: boolean }> = ({ active }) => (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center ${active ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
        {active ? 'Active' : 'Inactive'}
    </span>
);

export const CadencesView: React.FC = () => {
    const [cadences, setCadences] = useState<Cadence[]>(CADENCES);
    const [selectedCadence, setSelectedCadence] = useState<Cadence | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleSaveCadence = (updatedCadence: Cadence) => {
        setCadences(prev => prev.map(c => c.id === updatedCadence.id ? updatedCadence : c));
        setSelectedCadence(null);
        alert('Cadence changes saved successfully!');
    };
    
    const handleCreateCadence = (newCadenceData: Omit<Cadence, 'id'|'steps'|'active'>) => {
        const newCadence: Cadence = {
            id: `cad-${Date.now()}`,
            steps: [],
            active: false,
            ...newCadenceData,
        };
        setCadences(prev => [newCadence, ...prev]);
        setIsCreateModalOpen(false);
    };

    if (selectedCadence) {
        return <CadenceEditor 
                 cadence={selectedCadence} 
                 onBack={() => setSelectedCadence(null)}
                 onSave={handleSaveCadence}
               />;
    }

    return (
        <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Cadences</h1>
                    <p className="text-muted-foreground">Manage your automated and manual sales playbooks.</p>
                </div>
                <button onClick={() => setIsCreateModalOpen(true)} className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Create Cadence
                </button>
            </header>
            
            <div className="mt-6 flex-1 flex flex-col">
                <div className="border rounded-lg overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-secondary">
                                <tr>
                                    <th className="p-3 text-left font-semibold">Name</th>
                                    <th className="p-3 text-left font-semibold">Target Segment</th>
                                    <th className="p-3 text-left font-semibold">Steps</th>
                                    <th className="p-3 text-left font-semibold">Status</th>
                                    <th className="p-3 text-left font-semibold"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cadences.map((cadence, index) => (
                                    <tr key={cadence.id} className={`border-t border-border ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}`}>
                                        <td className="p-3 font-semibold">{cadence.name}</td>
                                        <td className="p-3 text-muted-foreground">{cadence.targetSegment}</td>
                                        <td className="p-3 text-muted-foreground">{cadence.steps.length}</td>
                                        <td className="p-3"><StatusBadge active={cadence.active} /></td>
                                        <td className="p-3 text-right">
                                            <button 
                                                onClick={() => setSelectedCadence(cadence)} 
                                                className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-muted transition-colors">
                                                Open Studio
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isCreateModalOpen && (
                <CadenceFormModal 
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleCreateCadence}
                />
            )}
        </div>
    );
};