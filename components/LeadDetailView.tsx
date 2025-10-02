import React from 'react';
import type { Lead, Activity } from '../types';
import { ActivityType } from '../types';
import { ACTIVITIES } from '../constants';
import { InsightsPanel } from './InsightsPanel';
import { StatusBadge } from './StatusBadge';

interface LeadDetailViewProps {
    lead: Lead;
    onBack: () => void;
    onEdit: () => void;
    onDelete: (leadId: string) => void;
}

const ActivityIcon = ({ type }: { type: ActivityType }) => {
    const icons: Record<ActivityType, React.ReactNode> = {
        [ActivityType.EMAIL]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
        [ActivityType.CALL]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
        [ActivityType.MEETING]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
        [ActivityType.NOTE]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
        [ActivityType.STATUS_CHANGE]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6m6-7l-6 6 6 6"/></svg>,
    };
    return <div className="h-6 w-6 text-muted-foreground">{icons[type]}</div>;
};

const InfoItem: React.FC<{ label: string; value?: string; children?: React.ReactNode }> = ({ label, value, children }) => {
    if (!value && !children) return null;
    return (
        <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
            {value && <p className="text-sm text-foreground">{value}</p>}
            {children}
        </div>
    );
};

export const LeadDetailView: React.FC<LeadDetailViewProps> = ({ lead, onBack, onEdit, onDelete }) => {
    const leadActivities = ACTIVITIES.filter(a => a.leadId === lead.id);

    return (
        <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
                        &larr; Back to Leads
                    </button>
                    <h1 className="text-2xl font-bold tracking-tight">{lead.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onDelete(lead.id)} className="bg-destructive/20 text-destructive-foreground font-semibold px-4 py-2 rounded-md hover:bg-destructive/30 transition-colors">
                        Delete Deal
                    </button>
                    <button onClick={onEdit} className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors">
                        Edit Lead
                    </button>
                </div>
            </header>
            
            {/* Insights Panel */}
            <div className="py-6">
                 <InsightsPanel leadId={lead.id} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
                {/* Left Panel: Lead Info */}
                <div className="lg:col-span-1 flex flex-col space-y-6">
                    <div className="p-6 bg-secondary rounded-lg border border-border">
                        <div className="flex flex-col items-center text-center">
                            <img className="h-24 w-24 rounded-full mb-4" src={lead.avatarUrl} alt={`${lead.name}'s avatar`} />
                            <h2 className="text-xl font-bold">{lead.name}</h2>
                            <p className="text-muted-foreground">{lead.company}</p>
                            <div className="mt-4">
                                <StatusBadge status={lead.status} />
                            </div>
                             <div className="mt-3 flex flex-wrap gap-1 justify-center">
                                {lead.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 text-xs bg-primary/20 text-primary-foreground rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-secondary rounded-lg border border-border space-y-4">
                         <h3 className="font-semibold mb-2">Contact Information</h3>
                         <InfoItem label="Email" value={lead.email} />
                         <InfoItem label="Phone" value={lead.phone} />
                         <InfoItem label="LinkedIn">
                            {lead.linkedin && <a href={`https://${lead.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">{lead.linkedin}</a>}
                         </InfoItem>
                    </div>

                    <div className="p-6 bg-secondary rounded-lg border border-border space-y-4">
                         <h3 className="font-semibold mb-2">Company Details</h3>
                         <InfoItem label="Website">
                            {lead.companyWebsite && <a href={`https://${lead.companyWebsite}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">{lead.companyWebsite}</a>}
                         </InfoItem>
                         <InfoItem label="Industry" value={lead.companyIndustry} />
                    </div>

                    <div className="p-6 bg-secondary rounded-lg border border-border space-y-4">
                        <h3 className="font-semibold mb-2">Additional Info</h3>
                        <InfoItem label="Lead Score">
                            <div className="flex items-center mt-1">
                                <div className="w-full bg-muted rounded-full h-2.5 mr-4">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${lead.score}%` }}></div>
                                </div>
                                <span className="text-lg font-bold">{lead.score}</span>
                            </div>
                        </InfoItem>
                        <InfoItem label="Lead Source" value={lead.leadSource} />
                        <InfoItem label="Owner" value={lead.owner} />
                         <p className="text-xs text-muted-foreground pt-2">Last contacted: {lead.lastContacted}</p>
                    </div>
                </div>

                {/* Right Panel: Unified Timeline */}
                <div className="lg:col-span-2 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">Unified Timeline</h2>
                    <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                        {leadActivities.length > 0 ? leadActivities.map(activity => (
                             <div key={activity.id} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="p-2 bg-secondary rounded-full border border-border">
                                        <ActivityIcon type={activity.type} />
                                    </div>
                                    <div className="w-px flex-1 bg-border"></div>
                                </div>
                                <div className="flex-1 pb-6">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">{activity.type}</p>
                                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">{activity.notes}</p>
                                    <div className="flex items-center mt-2">
                                        <img className="h-5 w-5 rounded-full mr-2" src={activity.author.avatarUrl} alt={activity.author.name} />
                                        <span className="text-xs text-muted-foreground">{activity.author.name}</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-10">
                                <p className="text-muted-foreground">No activities recorded for this lead yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};