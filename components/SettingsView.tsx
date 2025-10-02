import React, { useState } from 'react';
import { TENANT_SETTINGS, TEAM_MEMBERS, API_KEYS, VOICE_SDR_SETTINGS, ENRICHMENT_SETTINGS, CALENDAR_SETTINGS } from '../constants';
import type { TenantSettings, TeamMember, ApiKey, VoiceSdrSettings, EnrichmentSettings, CalendarSettings } from '../types';

type SettingsTab = 'tenant' | 'users' | 'keys' | 'integrations';

// FIX: Export the SettingsView component as a named export for consistency.
export const SettingsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('integrations');
    const [tenantSettings, setTenantSettings] = useState<TenantSettings>(TENANT_SETTINGS);
    
    const renderContent = () => {
        switch (activeTab) {
            case 'tenant':
                return <TenantSettingsPanel settings={tenantSettings} setSettings={setTenantSettings} />;
            case 'users':
                return <UsersPanel members={TEAM_MEMBERS} />;
            case 'keys':
                return <ApiKeysPanel keys={API_KEYS} />;
            case 'integrations':
                return <IntegrationsPanel />;
            default:
                return null;
        }
    };
    
    return (
        <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your workspace settings, users, and integrations.</p>
                </div>
                <button onClick={() => alert('Settings saved!')} className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Save Changes
                </button>
            </header>
            
            <div className="mt-6 flex flex-col flex-1">
                <div className="border-b border-border">
                    <nav className="-mb-px flex space-x-6">
                        <TabButton id="tenant" activeTab={activeTab} setActiveTab={setActiveTab}>Tenant</TabButton>
                        <TabButton id="users" activeTab={activeTab} setActiveTab={setActiveTab}>Users & Permissions</TabButton>
                        <TabButton id="keys" activeTab={activeTab} setActiveTab={setActiveTab}>API Keys</TabButton>
                        <TabButton id="integrations" activeTab={activeTab} setActiveTab={setActiveTab}>Integrations</TabButton>
                    </nav>
                </div>
                <div className="py-6 flex-1">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// Tab Button Component
const TabButton: React.FC<{ id: SettingsTab, activeTab: SettingsTab, setActiveTab: (tab: SettingsTab) => void, children: React.ReactNode }> = ({ id, activeTab, setActiveTab, children }) => (
    <button onClick={() => setActiveTab(id)} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
        {children}
    </button>
);

// Tenant Settings Panel
const TenantSettingsPanel: React.FC<{ settings: TenantSettings, setSettings: React.Dispatch<React.SetStateAction<TenantSettings>> }> = ({ settings, setSettings }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-2xl space-y-6">
            <h2 className="text-xl font-semibold">Tenant Information</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">Workspace Name</label>
                <input type="text" name="name" id="name" value={settings.name} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
                <label htmlFor="plan" className="block text-sm font-medium text-muted-foreground">Plan</label>
                <input type="text" name="plan" id="plan" value={settings.plan} disabled className="mt-1 block w-full bg-muted border border-border rounded-md shadow-sm py-2 px-3 cursor-not-allowed" />
            </div>
            <div>
                <label htmlFor="locale" className="block text-sm font-medium text-muted-foreground">Default Locale</label>
                <select name="locale" id="locale" value={settings.locale} onChange={handleChange} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                    <option value="en-US">English (United States)</option>
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="es-ES">Español (España)</option>
                </select>
            </div>
        </div>
    );
};

// Users Panel
const UsersPanel: React.FC<{ members: TeamMember[] }> = ({ members }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Team Members</h2>
            <button className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-md hover:bg-muted">Invite User</button>
        </div>
        <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-secondary">
                    <tr>
                        <th className="p-3 text-left font-semibold">User</th>
                        <th className="p-3 text-left font-semibold">Role</th>
                        <th className="p-3 text-left font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={member.id} className={`border-t border-border ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}`}>
                            <td className="p-3">
                                <div className="flex items-center">
                                    <img className="h-9 w-9 rounded-full" src={member.avatarUrl} alt={`${member.name}'s avatar`} />
                                    <div className="ml-3">
                                        <p className="font-semibold">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3">{member.role}</td>
                            <td className="p-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${member.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {member.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// API Keys Panel
const ApiKeysPanel: React.FC<{ keys: ApiKey[] }> = ({ keys }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-md hover:bg-muted">Create New Key</button>
        </div>
        <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-secondary">
                    <tr>
                        <th className="p-3 text-left font-semibold">Name</th>
                        <th className="p-3 text-left font-semibold">Key</th>
                        <th className="p-3 text-left font-semibold">Created</th>
                        <th className="p-3 text-left font-semibold">Last Used</th>
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key, index) => (
                        <tr key={key.id} className={`border-t border-border ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}`}>
                            <td className="p-3 font-semibold">{key.name}</td>
                            <td className="p-3 font-mono text-xs">{key.key}</td>
                            <td className="p-3 text-muted-foreground">{key.createdAt}</td>
                            <td className="p-3 text-muted-foreground">{key.lastUsed || 'Never'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// Integrations Panel
const IntegrationsPanel: React.FC = () => {
    const [voiceSettings, setVoiceSettings] = useState(VOICE_SDR_SETTINGS);
    const [enrichmentSettings, setEnrichmentSettings] = useState(ENRICHMENT_SETTINGS);
    const [calendarSettings, setCalendarSettings] = useState(CALENDAR_SETTINGS);

    const handleVoiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setVoiceSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleEnrichmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setEnrichmentSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleCalendarToggle = () => {
        setCalendarSettings(prev => ({ ...prev, connected: !prev.connected }));
    };

    return (
        <div className="max-w-3xl space-y-8">
            {/* Voice SDR */}
            <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Voice SDR</h2>
                        <p className="text-sm text-muted-foreground mt-1">Configure providers for outbound/inbound calls.</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" name="enabled" checked={voiceSettings.enabled} onChange={handleVoiceChange} className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
                <div className={`space-y-4 mt-4 transition-opacity ${voiceSettings.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <div>
                        <label htmlFor="ttsProvider" className="block text-sm font-medium text-muted-foreground">Text-to-Speech (TTS)</label>
                        <select id="ttsProvider" name="ttsProvider" value={voiceSettings.ttsProvider} onChange={handleVoiceChange} disabled={!voiceSettings.enabled} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary disabled:cursor-not-allowed">
                            <option value="eleven_labs">Eleven Labs</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="elevenLabsApiKey" className="block text-sm font-medium text-muted-foreground">Eleven Labs API Key</label>
                        <input type="password" id="elevenLabsApiKey" name="elevenLabsApiKey" value={voiceSettings.elevenLabsApiKey} onChange={handleVoiceChange} disabled={!voiceSettings.enabled} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 disabled:cursor-not-allowed" />
                    </div>
                    <div>
                        <label htmlFor="sttProvider" className="block text-sm font-medium text-muted-foreground">Speech-to-Text (STT)</label>
                        <select id="sttProvider" name="sttProvider" value={voiceSettings.sttProvider} onChange={handleVoiceChange} disabled={!voiceSettings.enabled} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 disabled:cursor-not-allowed">
                             <option value="gemini">Gemini</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="geminiApiKey" className="block text-sm font-medium text-muted-foreground">Gemini API Key</label>
                        <input type="password" id="geminiApiKey" name="geminiApiKey" value={voiceSettings.geminiApiKey} onChange={handleVoiceChange} disabled={!voiceSettings.enabled} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 disabled:cursor-not-allowed" />
                    </div>
                </div>
            </div>
            
            {/* Data Enrichment */}
             <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Data Enrichment</h2>
                        <p className="text-sm text-muted-foreground mt-1">Automatically enrich lead and contact data.</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" name="enabled" checked={enrichmentSettings.enabled} onChange={handleEnrichmentChange} className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>
                 <div className={`space-y-4 mt-4 transition-opacity ${enrichmentSettings.enabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <div>
                        <label htmlFor="provider" className="block text-sm font-medium text-muted-foreground">Provider</label>
                        <select id="provider" name="provider" value={enrichmentSettings.provider} onChange={handleEnrichmentChange} disabled={!enrichmentSettings.enabled} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 disabled:cursor-not-allowed">
                             <option value="clearbit">Clearbit</option>
                             <option value="apollo">Apollo.io</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-medium text-muted-foreground">API Key</label>
                        <input type="password" id="apiKey" name="apiKey" value={enrichmentSettings.apiKey} onChange={handleEnrichmentChange} disabled={!enrichmentSettings.enabled} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 disabled:cursor-not-allowed" />
                    </div>
                     <div>
                        <label htmlFor="monthlyBudget" className="block text-sm font-medium text-muted-foreground">Monthly Budget (USD)</label>
                        <input type="number" id="monthlyBudget" name="monthlyBudget" value={enrichmentSettings.monthlyBudget} onChange={handleEnrichmentChange} disabled={!enrichmentSettings.enabled} className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 disabled:cursor-not-allowed" />
                    </div>
                </div>
            </div>

            {/* Calendar */}
             <div className="p-6 bg-secondary/50 rounded-lg border border-border">
                <h2 className="text-xl font-semibold">Calendar</h2>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Connect your calendar for autonomous meeting scheduling.</p>
                <div className="flex items-center justify-between p-4 bg-background rounded-md">
                   <div>
                        <p className="font-semibold">Google Calendar</p>
                        {calendarSettings.connected ? (
                             <p className="text-sm text-green-400">Connected as {calendarSettings.email}</p>
                        ) : (
                             <p className="text-sm text-muted-foreground">Not connected</p>
                        )}
                   </div>
                   <button onClick={handleCalendarToggle} className={`font-semibold px-4 py-2 rounded-md text-sm ${calendarSettings.connected ? 'bg-destructive/20 text-destructive-foreground hover:bg-destructive/30' : 'bg-secondary hover:bg-muted'}`}>
                        {calendarSettings.connected ? 'Disconnect' : 'Connect'}
                   </button>
                </div>
            </div>
        </div>
    );
};