import type { Space, Document, IngestionJob, Chunk, Lead, User, Activity, TenantSettings, MariaConfig, TeamMember, ApiKey, AbTest, Cadence, CadenceStep, VoiceSdrSettings, EnrichmentSettings, CalendarSettings, Insight, AnalyticsData, Conversation, Task } from './types';
import { DocumentType, IngestionStatus, LeadStatus, LeadPriority, ActivityType, CadenceStepType, InsightType, Channel, TaskStatus } from './types';

export const SPACES: Space[] = [
  { id: 'space-1', name: 'Product', description: 'All product specifications and features.', icon: 'product', docCount: 4 },
  { id: 'space-2', name: 'Pricing', description: 'Pricing plans, discounts, and policies.', icon: 'pricing', docCount: 2 },
  { id: 'space-3', name: 'Policies', description: 'Company policies, SLA, and compliance.', icon: 'policy', docCount: 3 },
  { id: 'space-4', name: 'FAQs', description: 'Frequently asked questions from customers.', icon: 'faq', docCount: 1 },
  { id: 'space-5', name: 'Competitors', description: 'Intel and rebuttals on competitors.', icon: 'competitor', docCount: 5 },
  { id: 'space-6', name: 'Case Studies', description: 'Customer success stories and use cases.', icon: 'case', docCount: 2 },
];

const productChunks: Chunk[] = [
    {id: 'chunk-p1', documentId: 'doc-1', text: "MariaCRM is an AI-first sales development platform designed for multi-tenant use. It features RLS for data security.", metadata: { section: 'Overview'}},
    {id: 'chunk-p2', documentId: 'doc-1', text: "The core CRM entities include Accounts, Contacts, Leads, and Activities, following a Salesforce-compatible naming convention.", metadata: { section: 'Entities'}},
    {id: 'chunk-p3', documentId: 'doc-2', text: "Omnichannel support is built-in, covering WhatsApp, Email, and SMS. All interactions are logged in a unified timeline.", metadata: { section: 'Channels'}},
];

const pricingChunks: Chunk[] = [
    {id: 'chunk-pr1', documentId: 'doc-5', text: "The Pro plan is priced at $129 per user per month when billed annually. Monthly billing is available at $149.", metadata: { section: 'Pro Plan'}},
    {id: 'chunk-pr2', documentId: 'doc-5', text: "The Enterprise plan offers custom pricing and includes features like voice SDR and predictive booking.", metadata: { section: 'Enterprise Plan'}},
];


export const DOCUMENTS: Document[] = [
  { id: 'doc-1', name: 'MariaCRM Platform Overview.pdf', type: DocumentType.PDF, status: 'Published', updatedAt: '2024-07-28', spaceId: 'space-1', chunks: productChunks.slice(0,2) },
  { id: 'doc-2', name: 'Omnichannel Integration Guide.docx', type: DocumentType.DOCX, status: 'Published', updatedAt: '2024-07-25', spaceId: 'space-1', chunks: [productChunks[2]] },
  { id: 'doc-3', name: 'Internal Security Protocols', type: DocumentType.TEXT, status: 'Published', updatedAt: '2024-07-22', spaceId: 'space-1', chunks: [] },
  { id: 'doc-4', name: 'API Rate Limits v1.2', type: DocumentType.TEXT, status: 'Draft', updatedAt: '2024-07-29', spaceId: 'space-1', chunks: [] },
  { id: 'doc-5', name: 'Pricing Plans Q3 2024.pdf', type: DocumentType.PDF, status: 'Published', updatedAt: '2024-07-20', spaceId: 'space-2', chunks: pricingChunks },
  { id: 'doc-6', name: 'Discount Approval Policy', type: DocumentType.DOCX, status: 'Published', updatedAt: '2024-06-15', spaceId: 'space-2', chunks: [] },
  { id: 'doc-7', name: 'Data Retention Policy (GDPR).pdf', type: DocumentType.PDF, status: 'Published', updatedAt: '2024-07-18', spaceId: 'space-3', chunks: [] },
  { id: 'doc-8', name: 'Acceptable Use Policy', type: DocumentType.TEXT, status: 'Published', updatedAt: '2024-05-30', spaceId: 'space-3', chunks: [] },
  { id: 'doc-9', name: 'Service Level Agreement (SLA).docx', type: DocumentType.DOCX, status: 'Published', updatedAt: '2024-07-01', spaceId: 'space-3', chunks: [] },
  { id: 'doc-10', name: 'Onboarding FAQs.pdf', type: DocumentType.PDF, status: 'Published', updatedAt: '2024-07-26', spaceId: 'space-4', chunks: [] },
  { id: 'doc-11', name: 'vs Competitor A.pdf', type: DocumentType.PDF, status: 'Published', updatedAt: '2024-07-11', spaceId: 'space-5', chunks: [] },
  { id: 'doc-12', name: 'vs Competitor B.docx', type: DocumentType.DOCX, status: 'Published', updatedAt: '2024-07-12', spaceId: 'space-5', chunks: [] },
  { id: 'doc-13', name: 'vs Competitor C.pdf', type: DocumentType.PDF, status: 'Published', updatedAt: '2024-07-13', spaceId: 'space-5', chunks: [] },
  { id: 'doc-14', name: 'vs Competitor D.docx', type: DocumentType.DOCX, status: 'Draft', updatedAt: '2024-07-29', spaceId: 'space-5', chunks: [] },
  { id: 'doc-15', name: 'Rebuttal Handbook', type: DocumentType.TEXT, status: 'Published', updatedAt: '2024-06-30', spaceId: 'space-5', chunks: [] },
  { id: 'doc-16', name: 'Acme Corp Success Story.pdf', type: DocumentType.PDF, status: 'Published', updatedAt: '2024-07-05', spaceId: 'space-6', chunks: [] },
  { id: 'doc-17', name: 'Globex Inc Case Study.docx', type: DocumentType.DOCX, status: 'Published', updatedAt: '2024-06-25', spaceId: 'space-6', chunks: [] },
];

export const INITIAL_INGESTION_JOBS: IngestionJob[] = [
  { id: 'job-1', documentName: 'New Product Datasheet Q3.pdf', status: IngestionStatus.COMPLETED, submittedAt: '2024-07-29 10:00 AM', duration: '45s' },
  { id: 'job-2', documentName: 'https://blog.mariacrm.ai/new-features', status: IngestionStatus.COMPLETED, submittedAt: '2024-07-29 09:30 AM', duration: '1m 12s' },
  { id: 'job-3', documentName: 'Competitor E Analysis.docx', status: IngestionStatus.INGESTING, submittedAt: '2024-07-29 10:05 AM' },
  { id: 'job-4', documentName: 'Sales Playbook H2 2024.pdf', status: IngestionStatus.PENDING, submittedAt: '2024-07-29 10:06 AM' },
  { id: 'job-5', documentName: 'Onboarding Manual v3.pdf', status: IngestionStatus.FAILED, submittedAt: '2024-07-28 04:00 PM', duration: '15s' },
];

export const MOCK_USER: User = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Tenant Admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export const LEADS: Lead[] = [
  { id: 'lead-1', name: 'Alice Johnson', company: 'Innovate Inc.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', status: LeadStatus.NEW, priority: LeadPriority.HIGH, score: 85, lastContacted: '2024-07-29', email: 'alice.j@innovate.com', phone: '555-0101', linkedin: 'linkedin.com/in/alicejohnson', companyWebsite: 'innovate.com', companyIndustry: 'Technology', leadSource: 'Website', owner: MOCK_USER.name, tags: ['High Priority', 'SaaS'] },
  { id: 'lead-2', name: 'Bob Williams', company: 'Data Solutions', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', status: LeadStatus.WORKING, priority: LeadPriority.MEDIUM, score: 72, lastContacted: '2024-07-28', email: 'bob.w@datasolutions.co', phone: '555-0102', companyIndustry: 'Analytics', leadSource: 'Referral', owner: 'Jane Smith', tags: ['Follow-up'] },
  { id: 'lead-3', name: 'Charlie Brown', company: 'Synergy Corp.', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', status: LeadStatus.QUALIFIED, priority: LeadPriority.CRITICAL, score: 95, lastContacted: '2024-07-25', email: 'charlie@synergy.com', phone: '555-0103', linkedin: 'linkedin.com/in/charliebrown', companyWebsite: 'synergy.com', companyIndustry: 'Consulting', leadSource: 'Cold Outreach', owner: MOCK_USER.name, tags: ['Demo Booked', 'Decision Maker'] },
  { id: 'lead-4', name: 'Diana Prince', company: 'Global Tech', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704b', status: LeadStatus.NURTURING, priority: LeadPriority.LOW, score: 68, lastContacted: '2024-07-20', email: 'diana.p@globaltech.net', phone: '555-0104', companyWebsite: 'globaltech.net', leadSource: 'Webinar', owner: 'Jane Smith', tags: ['Case Study Sent'] },
  { id: 'lead-5', name: 'Ethan Hunt', company: 'Future Systems', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704c', status: LeadStatus.DISQUALIFIED, priority: LeadPriority.LOW, score: 30, lastContacted: '2024-07-15', email: 'ethan.h@future.io', phone: '555-0105', leadSource: 'Website', owner: MOCK_USER.name, tags: ['Budget Issue'] },
  { id: 'lead-6', name: 'Fiona Glenanne', company: 'CloudNet', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', status: LeadStatus.NEW, priority: LeadPriority.HIGH, score: 88, lastContacted: '2024-07-30', email: 'fiona.g@cloudnet.com', phone: '555-0106', linkedin: 'linkedin.com/in/fionaglenanne', companyWebsite: 'cloudnet.com', companyIndustry: 'IT Services', leadSource: 'LinkedIn', owner: MOCK_USER.name, tags: ['High Priority'] },
  { id: 'lead-7', name: 'George Costanza', company: 'Vandelay Industries', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e290267042', status: LeadStatus.WORKING, priority: LeadPriority.MEDIUM, score: 75, lastContacted: '2024-07-29', email: 'george.c@vandelay.com', phone: '555-0107', companyIndustry: 'Logistics', leadSource: 'Referral', owner: 'Jane Smith', tags: ['Needs Follow-up'] },
];

export const ACTIVITIES: Activity[] = [
    { id: 'act-1', leadId: 'lead-3', type: ActivityType.STATUS_CHANGE, timestamp: '2024-07-25 09:00 AM', notes: 'Status changed from Nurturing to Qualified.', author: { name: 'Maria AI', avatarUrl: 'https://i.pravatar.cc/150?u=maria-ai' } },
    { id: 'act-2', leadId: 'lead-3', type: ActivityType.MEETING, timestamp: '2024-07-24 02:30 PM', notes: 'Booked discovery call for July 28th.', author: { name: 'John Doe', avatarUrl: MOCK_USER.avatarUrl } },
    { id: 'act-3', leadId: 'lead-3', type: ActivityType.EMAIL, timestamp: '2024-07-22 10:15 AM', notes: 'Sent follow-up email with case study.', author: { name: 'Maria AI', avatarUrl: 'https://i.pravatar.cc/150?u=maria-ai' } },
    { id: 'act-4', leadId: 'lead-2', type: ActivityType.CALL, timestamp: '2024-07-28 11:45 AM', notes: 'Logged a 15-minute call. Discussed pricing.', author: { name: 'John Doe', avatarUrl: MOCK_USER.avatarUrl } },
    { id: 'act-5', leadId: 'lead-1', type: ActivityType.NOTE, timestamp: '2024-07-29 03:00 PM', notes: 'Lead mentioned they are evaluating competitors.', author: { name: 'John Doe', avatarUrl: MOCK_USER.avatarUrl } },
];

// Mock data for Settings and Maria Views
export const TENANT_SETTINGS: TenantSettings = {
    name: 'Innovate Inc.',
    plan: 'Enterprise',
    locale: 'en-US',
    timezone: '(GMT-05:00) Eastern Time',
};

export const MARIA_CONFIG: MariaConfig = {
    systemPrompt: 'You are Maria, an AI Sales Development Representative for Innovate Inc. Your goal is to qualify leads, provide helpful information, and book meetings. Be professional, friendly, and concise. Only use information from the provided knowledge base.',
    tone: {
        professionalism: 80,
        friendliness: 65,
    },
    guardrails: {
        disallowedTopics: true,
        sentimentAnalysis: true,
        piiDetection: false,
    },
};

export const TEAM_MEMBERS: TeamMember[] = [
    { id: 'user-1', name: 'John Doe', email: 'john.doe@example.com', role: 'Tenant Admin', status: 'Active', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 'user-2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Sales Rep', status: 'Active', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
    { id: 'user-3', name: 'Peter Jones', email: 'peter.jones@example.com', role: 'Marketing', status: 'Invited', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
];

export const TASKS: Task[] = [
    { id: 'task-1', title: 'Follow up on proposal', leadId: 'lead-3', assigneeId: 'user-1', dueDate: '2024-08-05', status: TaskStatus.TODO, notes: 'Charlie mentioned he would review the proposal by EOD Monday.' },
    { id: 'task-2', title: 'Prepare for discovery call', leadId: 'lead-2', assigneeId: 'user-2', dueDate: '2024-08-02', status: TaskStatus.IN_PROGRESS },
    { id: 'task-3', title: 'Send welcome sequence email #2', leadId: 'lead-1', assigneeId: 'user-1', dueDate: '2024-08-01', status: TaskStatus.DONE },
    { id: 'task-4', title: 'Research Vandelay Industries new logistics wing', leadId: 'lead-7', assigneeId: 'user-2', dueDate: '2024-08-03', status: TaskStatus.TODO },
    { id: 'task-5', title: 'Update internal competitor matrix', leadId: null, assigneeId: 'user-1', dueDate: '2024-08-10', status: TaskStatus.TODO, notes: 'Need to add Competitor E details.' },
];


export const API_KEYS: ApiKey[] = [
    { id: 'key-1', name: 'N8N Automation', key: 'sk_live_...aBc1', createdAt: '2024-06-01', lastUsed: '2024-07-30' },
    { id: 'key-2', name: 'Zapier Integration', key: 'sk_live_...dEf2', createdAt: '2024-05-15', lastUsed: null },
];

// Mock Data for Phase 2+
export const AB_TESTS: AbTest[] = [
    {
        id: 'ab-1',
        name: 'Q3 Welcome Email Subject',
        entity: 'Email Subject',
        variantA: 'Your AI-Powered Sales Journey Starts Now',
        variantB: 'Quick Question about Innovate Inc.',
        status: 'Completed',
        metrics: { opens: { a: 22.5, b: 31.2 }, replies: { a: 1.8, b: 4.5 }, winner: 'B' },
        totalParticipants: 1500,
    },
    {
        id: 'ab-2',
        name: 'Follow-up Cadence Timing',
        entity: 'Cadence Step',
        variantA: 'Day 3: Send follow-up',
        variantB: 'Day 4: Send follow-up',
        status: 'Running',
        metrics: { opens: { a: 45.1, b: 44.8 }, replies: { a: 3.1, b: 3.3 }, winner: null },
        totalParticipants: 850,
    }
];

export const CADENCES: Cadence[] = [
    {
        id: 'cad-1',
        name: 'Inbound SMB Leads',
        targetSegment: 'SMB, <50 Employees',
        active: true,
        steps: [
            { id: 'cs-1-1', type: CadenceStepType.AUTOMATED_EMAIL, delayDays: 0, templateName: 'Initial Welcome' },
            { id: 'cs-1-2', type: CadenceStepType.LINKEDIN_MESSAGE, delayDays: 2, templateName: 'LinkedIn Connection Request' },
            { id: 'cs-1-3', type: CadenceStepType.CALL_TASK, delayDays: 1, templateName: 'Introductory Call' },
            { id: 'cs-1-4', type: CadenceStepType.MANUAL_EMAIL, delayDays: 3, templateName: 'Value Prop Follow-up' },
        ],
    },
    {
        id: 'cad-2',
        name: 'Outbound Mid-Market',
        targetSegment: 'Mid-Market, 50-500 Employees',
        active: false,
        steps: [
            { id: 'cs-2-1', type: CadenceStepType.MANUAL_EMAIL, delayDays: 0, templateName: 'Cold Outbound - Pain Point' },
            { id: 'cs-2-2', type: CadenceStepType.CALL_TASK, delayDays: 2, templateName: 'Follow-up Call' },
            { id: 'cs-2-3', type: CadenceStepType.AUTOMATED_EMAIL, delayDays: 3, templateName: 'Case Study Nudge' },
        ],
    }
];


export const VOICE_SDR_SETTINGS: VoiceSdrSettings = {
    enabled: true,
    sttProvider: 'gemini',
    geminiApiKey: 'gm_sk_...def4',
    ttsProvider: 'eleven_labs',
    elevenLabsApiKey: 'el_sk_...xyz7',
};

export const ENRICHMENT_SETTINGS: EnrichmentSettings = {
    enabled: true,
    provider: 'clearbit',
    apiKey: 'cb_pk_...abc1',
    monthlyBudget: 500,
};

export const CALENDAR_SETTINGS: CalendarSettings = {
    provider: 'google',
    connected: true,
    email: 'sales@innovate-inc.com',
};

// Mock Data for Prospect Interaction Insights
export const LEAD_INSIGHTS: Insight[] = [
    {
        id: 'ins-1',
        leadId: 'lead-3',
        type: InsightType.SQL_PROBABILITY,
        title: '92% SQL Probability',
        rationale: 'High engagement, positive sentiment, and budget authority mentioned.',
        confidence: 0.92,
        data: {
            reasons: ['Budget holder confirmed', 'High email engagement', 'Urgent need expressed']
        }
    },
    {
        id: 'ins-2',
        leadId: 'lead-3',
        type: InsightType.INTENT_SIGNAL,
        title: 'Demo Request',
        rationale: 'Lead explicitly asked "Can we see a demo next week?" in the last email.',
        confidence: 0.99,
        actions: [{ label: 'Propose Meeting Times', type: 'add_task' }]
    },
    {
        id: 'ins-3',
        leadId: 'lead-2',
        type: InsightType.OBJECTION_DETECTED,
        title: 'Pricing Objection',
        rationale: 'Lead mentioned "Your pricing seems a bit high compared to Competitor A".',
        confidence: 0.85,
        actions: [{ label: 'View Rebuttal', type: 'view_rebuttal' }],
        data: {
            rebuttal: 'Competitor A lacks our AI-driven insight features, which provides a 20% higher ROI. We also offer flexible payment plans.'
        }
    },
     {
        id: 'ins-4',
        leadId: 'lead-2',
        type: InsightType.NEXT_BEST_ACTION,
        title: 'Send "Acme Corp" Case Study',
        rationale: 'Lead is in the same industry as Acme Corp. This case study addresses their mentioned scaling challenges.',
        confidence: 0.88,
        actions: [{ label: 'Draft Email with Case Study', type: 'send_email' }]
    },
    {
        id: 'ins-5',
        leadId: 'lead-4',
        type: InsightType.RISK_DETECTED,
        title: 'No Reply Risk',
        rationale: 'Lead has not replied to the last two emails over 5 days, breaking a previous pattern of 24-hour replies.',
        confidence: 0.75,
        actions: [{ label: 'Create Nudge Task', type: 'add_task' }]
    },
    {
        id: 'ins-6',
        leadId: 'lead-4',
        type: InsightType.TIMING_WINDOW,
        title: 'Optimal Contact Time: Tuesdays, 10 AM - 12 PM',
        rationale: 'Lead shows highest email open rates during this window.',
        confidence: 0.82,
    }
];

// Mock Data for Analytics
export const ANALYTICS_DATA: AnalyticsData = {
    kpis: [
        { title: 'Leads Generated', value: '1,284', change: 12.5, changeType: 'increase' },
        { title: 'Meetings Booked', value: '86', change: 8.2, changeType: 'increase' },
        { title: 'Conversion Rate', value: '6.7%', change: -2.1, changeType: 'decrease' },
        { title: 'Avg. Time to Qualify', value: '4.2 days', change: -5.0, changeType: 'decrease' },
    ],
    salesFunnel: [
        { stage: 'New', value: 1284 },
        { stage: 'Working', value: 980 },
        { stage: 'Nurturing', value: 450 },
        { stage: 'Qualified (SQL)', value: 152 },
        { stage: 'Meeting Booked', value: 86 },
    ],
};


// Mock Data for Inbox
export const CONVERSATIONS: Conversation[] = [
    {
        id: 'conv-1',
        leadId: 'lead-3',
        contactName: 'Charlie Brown',
        contactAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a',
        channel: Channel.EMAIL,
        lastMessage: 'Perfect, looking forward to it. Is there anything I should prepare?',
        timestamp: '10:30 AM',
        unreadCount: 0,
        messages: [
            { id: 'msg-1-1', text: 'Hi Charlie, confirming our demo for this Friday at 2 PM EST. Please let me know if that still works for you.', sender: 'John Doe', direction: 'outbound', timestamp: 'Yesterday' },
            { id: 'msg-1-2', text: 'Perfect, looking forward to it. Is there anything I should prepare?', sender: 'Charlie Brown', direction: 'inbound', timestamp: '10:30 AM' },
        ],
    },
    {
        id: 'conv-2',
        leadId: 'lead-2',
        contactName: 'Bob Williams',
        contactAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
        channel: Channel.WHATSAPP,
        lastMessage: 'Got it. Let me review with my team and I will get back to you.',
        timestamp: '9:15 AM',
        unreadCount: 1,
        messages: [
            { id: 'msg-2-1', text: 'Hey Bob, following up on our call. Here is the pricing sheet we discussed.', sender: 'John Doe', direction: 'outbound', timestamp: '8:55 AM' },
            { id: 'msg-2-2', text: 'Got it. Let me review with my team and I will get back to you.', sender: 'Bob Williams', direction: 'inbound', timestamp: '9:15 AM' },
        ],
    },
    {
        id: 'conv-3',
        leadId: 'lead-7',
        contactName: 'George Costanza',
        contactAvatar: 'https://i.pravatar.cc/150?u=a042581f4e290267042',
        channel: Channel.EMAIL,
        lastMessage: 'Thanks for reaching out, I will take a look at the link you sent.',
        timestamp: 'Yesterday',
        unreadCount: 0,
        messages: [
            { id: 'msg-3-1', text: 'Hi George, I saw Vandelay Industries is expanding and thought our platform could help streamline your sales process.', sender: 'John Doe', direction: 'outbound', timestamp: 'Yesterday' },
            { id: 'msg-3-2', text: 'Thanks for reaching out, I will take a look at the link you sent.', sender: 'George Costanza', direction: 'inbound', timestamp: 'Yesterday' },
        ],
    }
];