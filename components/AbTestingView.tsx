import React, { useState } from 'react';
import { AB_TESTS } from '../constants';
import type { AbTest } from '../types';
import { AbTestFormModal } from './AbTestFormModal';

const BeakerIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4.5 3h15" /> <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" /> <path d="M6 14h12" /> </svg> );

const StatusBadge: React.FC<{ status: AbTest['status'] }> = ({ status }) => {
    const isRunning = status === 'Running';
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center ${isRunning ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
            {isRunning && <span className="w-2 h-2 mr-2 bg-blue-400 rounded-full animate-pulse"></span>}
            {status}
        </span>
    );
};

const WinnerTag: React.FC<{ winner: AbTest['metrics']['winner'] }> = ({ winner }) => {
    if (!winner) return null;
    return (
        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-yellow-500/20 text-yellow-300">
            WINNER: {winner}
        </span>
    )
};


const AbTestCard: React.FC<{ test: AbTest }> = ({ test }) => {
    const MetricDisplay: React.FC<{ name: string, valA: number, valB: number }> = ({ name, valA, valB }) => (
        <div>
            <p className="text-sm text-muted-foreground">{name}</p>
            <div className="flex items-baseline gap-4 mt-1">
                <p><span className="font-mono text-lg font-semibold">{valA}%</span> <span className="text-xs text-muted-foreground">A</span></p>
                <p><span className="font-mono text-lg font-semibold">{valB}%</span> <span className="text-xs text-muted-foreground">B</span></p>
            </div>
        </div>
    );
    
    return (
        <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs text-muted-foreground">{test.entity}</p>
                    <h2 className="text-lg font-bold">{test.name}</h2>
                </div>
                <StatusBadge status={test.status} />
            </div>

            <div className="my-4 space-y-3 text-sm">
                <div className="flex items-start">
                    <span className="font-bold text-primary w-4">A:</span>
                    <p className="ml-2 text-muted-foreground italic">"{test.variantA}"</p>
                </div>
                 <div className="flex items-start">
                    <span className="font-bold text-primary w-4">B:</span>
                    <p className="ml-2 text-muted-foreground italic">"{test.variantB}"</p>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-border">
                <div className="flex justify-between items-end">
                    <div className="flex gap-6">
                        <MetricDisplay name="Open Rate" valA={test.metrics.opens.a} valB={test.metrics.opens.b} />
                        <MetricDisplay name="Reply Rate" valA={test.metrics.replies.a} valB={test.metrics.replies.b} />
                    </div>
                    <WinnerTag winner={test.metrics.winner} />
                </div>
                <p className="text-xs text-muted-foreground text-right mt-2">{test.totalParticipants} participants</p>
            </div>
        </div>
    );
};


export const AbTestingView: React.FC = () => {
    const [tests, setTests] = useState<AbTest[]>(AB_TESTS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateTest = (newTest: Omit<AbTest, 'id' | 'status' | 'metrics' | 'totalParticipants'>) => {
        const testToAdd: AbTest = {
            id: `ab-${Date.now()}`,
            status: 'Running',
            metrics: { opens: { a: 0, b: 0 }, replies: { a: 0, b: 0 }, winner: null },
            totalParticipants: 0,
            ...newTest,
        };
        setTests(prev => [testToAdd, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">A/B Lab</h1>
                    <p className="text-muted-foreground">Create and monitor experiments to optimize performance.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
                    <BeakerIcon className="h-4 w-4" />
                    Create New Test
                </button>
            </header>

            <div className="mt-6 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {tests.map(test => (
                        <AbTestCard key={test.id} test={test} />
                    ))}
                </div>
            </div>
            {isModalOpen && (
                <AbTestFormModal 
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleCreateTest}
                />
            )}
        </div>
    );
};