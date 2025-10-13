import React from 'react';
import { LeadPriority } from '../types';

// Icons
const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5l-6 6h4v6h4v-6h4l-6-6z"/></svg>);
const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l-6 6h4V7h4v6h4l-6 6z"/></svg>);
const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const AlertTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);


interface PriorityBadgeProps {
    priority: LeadPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
    const priorityConfig: Record<LeadPriority, { icon: React.ReactNode; className: string }> = {
        [LeadPriority.LOW]: { icon: <ArrowDownIcon className="h-4 w-4" />, className: 'bg-gray-500/20 text-gray-300' },
        [LeadPriority.MEDIUM]: { icon: <MinusIcon className="h-4 w-4" />, className: 'bg-blue-500/20 text-blue-300' },
        [LeadPriority.HIGH]: { icon: <ArrowUpIcon className="h-4 w-4" />, className: 'bg-yellow-500/20 text-yellow-300' },
        [LeadPriority.CRITICAL]: { icon: <AlertTriangleIcon className="h-4 w-4" />, className: 'bg-red-500/20 text-red-300' },
    };
    
    const config = priorityConfig[priority];
    
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1.5 ${config.className}`}>
            {config.icon}
            {priority}
        </span>
    );
}