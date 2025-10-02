import React from 'react';
import { LEAD_INSIGHTS } from '../constants';
import type { Insight } from '../types';
import { InsightType } from '../types';

interface InsightsPanelProps {
    leadId: string;
}

// Icons
const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>);
const ShieldAlertIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>);
const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>);
const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z"/></svg>);
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);


const INSIGHT_META: Record<InsightType, { icon: React.ReactNode, color: string }> = {
    [InsightType.NEXT_BEST_ACTION]: { icon: <ZapIcon />, color: 'text-blue-400' },
    [InsightType.OBJECTION_DETECTED]: { icon: <ShieldAlertIcon />, color: 'text-yellow-400' },
    [InsightType.INTENT_SIGNAL]: { icon: <TargetIcon />, color: 'text-green-400' },
    [InsightType.RISK_DETECTED]: { icon: <ShieldAlertIcon />, color: 'text-red-400' },
    [InsightType.SQL_PROBABILITY]: { icon: <TrendingUpIcon />, color: 'text-purple-400' },
    [InsightType.TIMING_WINDOW]: { icon: <ClockIcon />, color: 'text-cyan-400' },
};

const InsightCard: React.FC<{ insight: Insight }> = ({ insight }) => {
    const meta = INSIGHT_META[insight.type];

    const handleAction = (actionType: string) => {
        alert(`Simulating action: ${actionType}`);
    };

    return (
        <div className="bg-secondary/50 border border-border rounded-lg p-4 flex gap-4">
            <div className={`mt-1 h-6 w-6 flex-shrink-0 ${meta.color}`}>
                {meta.icon}
            </div>
            <div className="flex-1">
                <p className={`font-bold ${meta.color}`}>{insight.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{insight.rationale}</p>
                
                {insight.type === InsightType.SQL_PROBABILITY && insight.data?.reasons && (
                    <ul className="text-xs text-muted-foreground mt-2 list-disc list-inside space-y-1">
                        {insight.data.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
                    </ul>
                )}
                
                {insight.type === InsightType.OBJECTION_DETECTED && insight.data?.rebuttal && (
                    <div className="mt-2 text-xs p-2 bg-background/50 rounded-md border border-border">
                        <p className="font-semibold">Suggested Rebuttal:</p>
                        <p className="italic text-muted-foreground">{insight.data.rebuttal}</p>
                    </div>
                )}
                
                {insight.actions && (
                    <div className="mt-3 flex gap-2">
                        {insight.actions.map((action, i) => (
                            <button 
                                key={i}
                                onClick={() => handleAction(action.label)}
                                className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary-foreground rounded-md hover:bg-primary/30 transition-colors"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ leadId }) => {
    const insights = LEAD_INSIGHTS.filter(i => i.leadId === leadId);

    if (insights.length === 0) {
        return null; // Or a placeholder message
    }

    return (
        <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center mb-4">
                <LightbulbIcon className="h-6 w-6 text-yellow-400" />
                <h2 className="text-xl font-semibold ml-3">Insights & Next Actions</h2>
            </div>
            <div className="space-y-3">
                {insights.map(insight => (
                    <InsightCard key={insight.id} insight={insight} />
                ))}
            </div>
        </div>
    );
};