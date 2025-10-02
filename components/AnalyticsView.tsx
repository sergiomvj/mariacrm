import React from 'react';
import { ANALYTICS_DATA } from '../constants';
import type { Kpi } from '../types';

const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>);
const TrendingDownIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>);


const KpiCard: React.FC<{ kpi: Kpi }> = ({ kpi }) => {
    const isIncrease = kpi.changeType === 'increase';
    const isPositiveChange = (isIncrease && kpi.change > 0) || (!isIncrease && kpi.change < 0);

    return (
        <div className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm text-muted-foreground">{kpi.title}</p>
            <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-3xl font-bold">{kpi.value}</h3>
                <div className={`flex items-center text-sm font-semibold ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositiveChange ? <TrendingUpIcon className="h-4 w-4" /> : <TrendingDownIcon className="h-4 w-4" />}
                    <span>{Math.abs(kpi.change)}%</span>
                </div>
            </div>
        </div>
    );
};

const SalesFunnelChart: React.FC<{ data: { stage: string; value: number }[] }> = ({ data }) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Sales Funnel</h2>
            <div className="space-y-4">
                {data.map(item => (
                    <div key={item.stage} className="flex items-center gap-4">
                        <p className="w-40 text-sm text-muted-foreground truncate">{item.stage}</p>
                        <div className="flex-1 bg-secondary rounded-full h-6">
                             <div 
                                className="bg-primary h-6 rounded-full flex items-center justify-end px-2"
                                style={{ width: `${(item.value / maxValue) * 100}%` }}
                             >
                                <span className="text-xs font-bold text-primary-foreground">{item.value.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export const AnalyticsView: React.FC = () => {
    const { kpis, salesFunnel } = ANALYTICS_DATA;

    return (
        <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <header className="pb-4 border-b border-border">
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">Monitor performance and track key sales metrics.</p>
            </header>

            <div className="mt-6 space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map(kpi => (
                        <KpiCard key={kpi.title} kpi={kpi} />
                    ))}
                </div>

                {/* Sales Funnel */}
                <div>
                    <SalesFunnelChart data={salesFunnel} />
                </div>
            </div>
        </div>
    );
};
