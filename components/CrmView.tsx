import React, { useState } from 'react';
import { LEADS } from '../constants';
import type { Lead } from '../types';
import { LeadDetailView } from './LeadDetailView';
import { LeadFormModal } from './LeadFormModal';
import { StatusBadge } from './StatusBadge';

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export const CrmView: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>(LEADS);
    const [filter, setFilter] = useState('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [editingLead, setEditingLead] = useState<Lead | null | undefined>(undefined); // undefined for new, Lead for edit

    const handleSelectLead = (lead: Lead) => {
        setSelectedLead(lead);
    };

    const handleBackToList = () => {
        setSelectedLead(null);
    };

    const handleSaveLead = (leadToSave: Lead) => {
        if (leads.some(l => l.id === leadToSave.id)) {
            // Update
            setLeads(leads.map(l => l.id === leadToSave.id ? leadToSave : l));
        } else {
            // Create
            setLeads([leadToSave, ...leads]);
        }
        // If the currently viewed lead is the one being edited, update it
        if(selectedLead?.id === leadToSave.id) {
            setSelectedLead(leadToSave);
        }
        setEditingLead(undefined);
    };

    const handleDeleteLead = (leadId: string) => {
        if (window.confirm('Are you sure you want to delete this deal?')) {
            setLeads(leads.filter(l => l.id !== leadId));
            setSelectedLead(null);
        }
    };
    

    const filteredLeads = leads.filter(lead => 
        lead.name.toLowerCase().includes(filter.toLowerCase()) ||
        lead.company.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            {selectedLead ? (
                <LeadDetailView 
                    lead={selectedLead} 
                    onBack={handleBackToList} 
                    onEdit={() => setEditingLead(selectedLead)}
                    onDelete={handleDeleteLead}
                />
            ) : (
                <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
                    {/* Header */}
                    <header className="flex items-center justify-between pb-4 border-b border-border">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
                            <p className="text-muted-foreground">Manage your leads, contacts, and accounts.</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="relative w-64">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input 
                                  type="search" 
                                  placeholder="Filter leads..." 
                                  value={filter}
                                  onChange={(e) => setFilter(e.target.value)}
                                  className="w-full bg-input pl-10 pr-4 py-2 rounded-md border border-border focus:ring-primary focus:border-primary" />
                            </div>
                            <button onClick={() => setEditingLead(null)} className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                                Add Lead
                            </button>
                        </div>
                    </header>

                    {/* Leads Table */}
                    <div className="mt-6 flex-1 flex flex-col">
                        <div className="border rounded-lg overflow-hidden flex-1 flex flex-col">
                            <div className="overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-secondary">
                                        <tr>
                                            <th className="p-3 text-left font-semibold w-2/5">Lead</th>
                                            <th className="p-3 text-left font-semibold">Status</th>
                                            <th className="p-3 text-left font-semibold">Score</th>
                                            <th className="p-3 text-left font-semibold">Last Contacted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLeads.map((lead, index) => (
                                            <tr 
                                              key={lead.id} 
                                              onClick={() => handleSelectLead(lead)}
                                              className={`border-t border-border cursor-pointer hover:bg-muted/50 transition-colors ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}`}
                                            >
                                                <td className="p-3">
                                                    <div className="flex items-center">
                                                        <img className="h-9 w-9 rounded-full" src={lead.avatarUrl} alt={`${lead.name}'s avatar`} />
                                                        <div className="ml-3">
                                                            <p className="font-semibold">{lead.name}</p>
                                                            <p className="text-xs text-muted-foreground">{lead.company}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3">
                                                    <StatusBadge status={lead.status} />
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex items-center">
                                                        <div className="w-16 bg-muted rounded-full h-1.5 mr-2">
                                                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${lead.score}%` }}></div>
                                                        </div>
                                                        <span className="font-medium">{lead.score}</span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-muted-foreground">{lead.lastContacted}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {editingLead !== undefined && (
                <LeadFormModal 
                    lead={editingLead} 
                    onSave={handleSaveLead}
                    onClose={() => setEditingLead(undefined)} 
                />
            )}
        </>
    );
};