export enum DocumentType {
  PDF = 'PDF',
  DOCX = 'DOCX',
  URL = 'URL',
  TEXT = 'TEXT',
}

export enum IngestionStatus {
  PENDING = 'Pending',
  INGESTING = 'Ingesting',
  COMPLETED = 'Completed',
  FAILED = 'Failed',
}

export interface Space {
  id: string;
  name: string;
  description: string;
  icon: 'product' | 'pricing' | 'policy' | 'faq' | 'competitor' | 'case';
  docCount: number;
}

export interface Document {
  id: string;
  name:string;
  type: DocumentType;
  status: 'Published' | 'Draft';
  updatedAt: string;
  spaceId: string;
  chunks: Chunk[];
}

export interface Chunk {
  id: string;
  documentId: string;
  text: string;
  metadata: {
    page?: number;
    section?: string;
  };
}


export interface IngestionJob {
  id: string;
  documentName: string;
  status: IngestionStatus;
  submittedAt: string;
  duration?: string;
}

export interface Citation {
    documentId: string;
    documentName: string;
}

export enum LeadStatus {
  NEW = 'New',
  WORKING = 'Working',
  NURTURING = 'Nurturing',
  QUALIFIED = 'Qualified',
  DISQUALIFIED = 'Disqualified',
}

export enum LeadPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  avatarUrl: string;
  status: LeadStatus;
  priority: LeadPriority;
  score: number;
  lastContacted: string;
  email: string;
  phone: string;
  linkedin?: string;
  companyWebsite?: string;
  companyIndustry?: string;
  leadSource?: string;
  owner: string;
  tags: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Tenant Admin' | 'Sales Rep';
    avatarUrl: string;
}

export enum ActivityType {
    EMAIL = 'Email Sent',
    CALL = 'Call Logged',
    MEETING = 'Meeting Booked',
    NOTE = 'Note Added',
    STATUS_CHANGE = 'Status Changed',
}

export interface Activity {
    id: string;
    leadId: string;
    type: ActivityType;
    timestamp: string;
    notes: string;
    author: {
        name: string;
        avatarUrl: string;
    };
}

// Task Management Types
export enum TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done',
}

export interface Task {
    id: string;
    title: string;
    leadId: string | null;
    assigneeId: string;
    dueDate: string;
    status: TaskStatus;
    notes?: string;
}


// Types for Settings and Maria View
export interface TenantSettings {
    name: string;
    plan: 'Pro' | 'Enterprise';
    locale: 'en-US' | 'pt-BR' | 'es-ES';
    timezone: string;
}

export type UserRole = 'Tenant Admin' | 'Sales Rep' | 'Marketing' | 'Read-only';

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: 'Active' | 'Invited';
    avatarUrl: string;
}

export interface ApiKey {
    id: string;
    name: string;
    key: string;
    createdAt: string;
    lastUsed: string | null;
}

export interface MariaConfig {
    systemPrompt: string;
    tone: {
        professionalism: number; // 0-100
        friendliness: number; // 0-100
    };
    guardrails: {
        [key: string]: boolean;
        disallowedTopics: boolean;
        sentimentAnalysis: boolean;
        piiDetection: boolean;
    };
}

// Phase 2+ Types
export interface AbTest {
    id: string;
    name: string;
    entity: 'Email Subject' | 'Cadence Step';
    variantA: string;
    variantB: string;
    status: 'Running' | 'Completed';
    metrics: {
        opens: { a: number, b: number };
        replies: { a: number, b: number };
        winner: 'A' | 'B' | null;
    };
    totalParticipants: number;
}

export interface VoiceSdrSettings {
    enabled: boolean;
    sttProvider: 'gemini';
    geminiApiKey: string;
    ttsProvider: 'eleven_labs';
    elevenLabsApiKey: string;
}

export interface EnrichmentSettings {
    enabled: boolean;
    provider: 'clearbit' | 'apollo';
    apiKey: string;
    monthlyBudget: number; // in USD
}

export interface CalendarSettings {
    provider: 'google' | 'calendly';
    connected: boolean;
    email: string | null;
}

export enum CadenceStepType {
    AUTOMATED_EMAIL = 'Automated Email',
    MANUAL_EMAIL = 'Manual Email',
    CALL_TASK = 'Call Task',
    LINKEDIN_MESSAGE = 'LinkedIn Message',
}


export interface CadenceStep {
    id: string;
    type: CadenceStepType;
    delayDays: number;
    templateName: string;
}

export interface Cadence {
    id: string;
    name: string;
    targetSegment: string;
    steps: CadenceStep[];
    active: boolean;
}

// Prospect Interaction Insights Types
export enum InsightType {
    NEXT_BEST_ACTION = 'Next Best Action',
    OBJECTION_DETECTED = 'Objection Detected',
    INTENT_SIGNAL = 'Intent Signal',
    RISK_DETECTED = 'Risk Detected',
    SQL_PROBABILITY = 'SQL Probability',
    TIMING_WINDOW = 'Timing Window',
}

export interface InsightAction {
    label: string;
    type: 'send_email' | 'add_task' | 'view_rebuttal';
}

export interface Insight {
    id: string;
    leadId: string;
    type: InsightType;
    title: string;
    rationale: string;
    confidence: number; // 0-1
    actions?: InsightAction[];
    data?: {
        rebuttal?: string;
        reasons?: string[];
    };
}

// Analytics Types
export interface Kpi {
    title: string;
    value: string;
    change: number; // percentage
    changeType: 'increase' | 'decrease';
}

export interface AnalyticsData {
    kpis: Kpi[];
    salesFunnel: {
        stage: string;
        value: number;
    }[];
}

// Inbox Types
export enum Channel {
    EMAIL = 'Email',
    WHATSAPP = 'WhatsApp',
}

export interface Message {
    id: string;
    text: string;
    timestamp: string;
    direction: 'inbound' | 'outbound';
    sender: string; // 'user' or contact name
}

export interface Conversation {
    id: string;
    leadId: string;
    contactName: string;
    contactAvatar: string;
    channel: Channel;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    messages: Message[];
}