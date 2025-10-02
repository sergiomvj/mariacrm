import React from 'react';
import { LeadStatus } from '../types';

interface StatusBadgeProps {
    status: LeadStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const baseClasses = 'px-2.5 py-1 text-xs font-semibold rounded-full inline-flex items-center capitalize';
    const statusClasses: Record<LeadStatus, string> = {
        [LeadStatus.NEW]: 'bg-blue-500/20 text-blue-300',
        [LeadStatus.WORKING]: 'bg-yellow-500/20 text-yellow-300',
        [LeadStatus.NURTURING]: 'bg-purple-500/20 text-purple-300',
        [LeadStatus.QUALIFIED]: 'bg-green-500/20 text-green-300',
        [LeadStatus.DISQUALIFIED]: 'bg-red-500/20 text-red-400',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status.toLowerCase()}</span>;
}
