import React, { useState } from 'react';
import { MARIA_CONFIG } from '../constants';
import type { MariaConfig } from '../types';

// FIX: Export the MariaView component to make it available for import.
export const MariaView: React.FC = () => {
    const [config, setConfig] = useState<MariaConfig>(MARIA_CONFIG);
    const [predictiveBooking, setPredictiveBooking] = useState(true);

    const handleToneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            tone: { ...prev.tone, [name]: parseInt(value, 10) }
        }));
    };

    const handleGuardrailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            guardrails: { ...prev.guardrails, [name]: checked }
        }));
    };
    
    const handleSaveChanges = () => {
        // In a real app, this would make an API call.
        // For this demo, we'll just show an alert.
        alert('AI configuration saved successfully!');
    };

    return (
        <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Maria (AI Brain)</h1>
                    <p className="text-muted-foreground">Configure the core behavior of your AI assistant.</p>
                </div>
                <button onClick={handleSaveChanges} className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Save Changes
                </button>
            </header>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* System Prompt Panel */}
                    <div className="bg-card border border-border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-3">System Prompt</h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            This is the core instruction that guides Maria's personality and goals. Be explicit about her role, constraints, and objectives.
                        </p>
                        <textarea
                            value={config.systemPrompt}
                            onChange={(e) => setConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                            className="w-full bg-input border border-border rounded-md shadow-sm p-3 focus:outline-none focus:ring-primary focus:border-primary min-h-[200px] text-sm"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Tone & Style Panel */}
                    <div className="bg-card border border-border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Tone & Style</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="professionalism" className="flex justify-between text-sm font-medium text-muted-foreground">
                                    <span>Professionalism</span>
                                    <span>{config.tone.professionalism}%</span>
                                </label>
                                <input
                                    type="range"
                                    name="professionalism"
                                    id="professionalism"
                                    min="0"
                                    max="100"
                                    value={config.tone.professionalism}
                                    onChange={handleToneChange}
                                    className="mt-1 block w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div>
                                <label htmlFor="friendliness" className="flex justify-between text-sm font-medium text-muted-foreground">
                                    <span>Friendliness</span>
                                    <span>{config.tone.friendliness}%</span>
                                </label>
                                <input
                                    type="range"
                                    name="friendliness"
                                    id="friendliness"
                                    min="0"
                                    max="100"
                                    value={config.tone.friendliness}
                                    onChange={handleToneChange}
                                    className="mt-1 block w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Scheduling & Booking Panel */}
                    <div className="bg-card border border-border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Scheduling & Booking</h2>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">Enable Predictive Booking</span>
                                <input type="checkbox" name="predictiveBooking" checked={predictiveBooking} onChange={(e) => setPredictiveBooking(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            </label>
                             <p className="text-xs text-muted-foreground">
                                Allow Maria to suggest the best time/day per persona and timezone.
                            </p>
                        </div>
                    </div>


                    {/* Safety Guardrails Panel */}
                    <div className="bg-card border border-border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Safety Guardrails</h2>
                        <div className="space-y-3">
                            <label className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">Disallowed Topics</span>
                                <input type="checkbox" name="disallowedTopics" checked={config.guardrails.disallowedTopics} onChange={handleGuardrailChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">Sentiment Analysis</span>
                                <input type="checkbox" name="sentimentAnalysis" checked={config.guardrails.sentimentAnalysis} onChange={handleGuardrailChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            </label>
                            <label className="flex items-center justify-between">
                                <span className="text-sm font-medium text-foreground">PII Detection</span>
                                <input type="checkbox" name="piiDetection" checked={config.guardrails.piiDetection} onChange={handleGuardrailChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};