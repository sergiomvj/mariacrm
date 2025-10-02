import React from 'react';
import type { User } from '../types';
import type { View } from '../App';

interface SidebarProps {
    user: User;
    activeView: View;
    onNavigate: (view: View) => void;
    onLogout: () => void;
}

// SVG Icons
const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.38a1 1 0 0 1 .82.42l1.6 2.4a1 1 0 0 0 .82.42H18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2.18a1 1 0 0 0-.82.42l-1.6 2.4a1 1 0 0 1-.82.42h-.38a1 1 0 0 0-1 1V20a2.5 2.5 0 0 1-5 0v-1.2a1 1 0 0 0-1-1h-.38a1 1 0 0 1-.82-.42l-1.6-2.4a1 1 0 0 0-.82-.42H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2.18a1 1 0 0 0 .82-.42l1.6-2.4a1 1 0 0 1 .82-.42h.38a1 1 0 0 0 1-1V4.5A2.5 2.5 0 0 1 9.5 2z" />
    </svg>
);
const BeakerIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4.5 3h15" /> <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" /> <path d="M6 14h12" /> </svg> );
const DatabaseIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /> </svg> );
const InboxIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /> </svg> );
const RepeatIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /> </svg> );
const BookIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /> </svg> );
const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /> </svg> );
const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /> </svg> );
const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> );


const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors w-full text-left ${active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
        {icon}
        <span className="ml-3">{label}</span>
    </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ user, activeView, onNavigate, onLogout }) => {
    return (
        <aside className="w-64 flex-col bg-card border-r border-border p-4 hidden md:flex">
            <div className="flex items-center h-16 mb-4">
                <BrainIcon className="h-8 w-8 text-primary" />
                <h1 className="ml-2 text-2xl font-bold">Maria<span className="font-light">CRM</span></h1>
            </div>
            <nav className="flex-1 flex flex-col space-y-2">
                <NavItem icon={<BrainIcon className="h-5 w-5" />} label="Maria" active={activeView === 'Maria'} onClick={() => onNavigate('Maria')} />
                <NavItem icon={<BeakerIcon className="h-5 w-5" />} label="A/B Lab" active={activeView === 'A/B Lab'} onClick={() => onNavigate('A/B Lab')} />
                <NavItem icon={<DatabaseIcon className="h-5 w-5" />} label="CRM" active={activeView === 'CRM'} onClick={() => onNavigate('CRM')} />
                <NavItem icon={<InboxIcon className="h-5 w-5" />} label="Inbox" active={activeView === 'Inbox'} onClick={() => onNavigate('Inbox')} />
                <NavItem icon={<RepeatIcon className="h-5 w-5" />} label="Cadences" active={activeView === 'Cadences'} onClick={() => onNavigate('Cadences')} />
                <NavItem icon={<BookIcon className="h-5 w-5" />} label="Knowledge" active={activeView === 'Knowledge'} onClick={() => onNavigate('Knowledge')} />
                <NavItem icon={<BarChartIcon className="h-5 w-5" />} label="Analytics" active={activeView === 'Analytics'} onClick={() => onNavigate('Analytics')} />
            </nav>
            <div className="mt-auto">
                 <NavItem icon={<SettingsIcon className="h-5 w-5" />} label="Settings" active={activeView === 'Settings'} onClick={() => onNavigate('Settings')} />
                 <div className="border-t border-border mt-2 pt-4">
                    <div className="flex items-center p-2">
                        <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="User avatar" />
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.role}</p>
                        </div>
                        <button onClick={onLogout} className="ml-auto text-muted-foreground hover:text-foreground transition-colors" aria-label="Logout">
                            <LogOutIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};