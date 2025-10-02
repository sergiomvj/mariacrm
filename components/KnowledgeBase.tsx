import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SPACES, DOCUMENTS, INITIAL_INGESTION_JOBS } from '../constants';
import type { Space, Document as DocType, IngestionJob, Chunk } from '../types';
import { IngestionStatus, DocumentType } from '../types';
import { ImportDocumentModal } from './ImportDocumentModal';

// Icons
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const ProductIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>);
const PricingIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>);
const PolicyIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>);
const FaqIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>);
const CompetitorIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M9 6l-6 6 6 6M21 18l-6-6 6-6"></path></svg>);
const CaseIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>);
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z"/></svg>);

const SPACE_ICONS: Record<Space['icon'], React.ReactNode> = {
  product: <ProductIcon className="h-6 w-6 text-primary" />,
  pricing: <PricingIcon className="h-6 w-6 text-green-500" />,
  policy: <PolicyIcon className="h-6 w-6 text-yellow-500" />,
  faq: <FaqIcon className="h-6 w-6 text-blue-500" />,
  competitor: <CompetitorIcon className="h-6 w-6 text-red-500" />,
  case: <CaseIcon className="h-6 w-6 text-indigo-500" />,
};

const DOC_ICONS: Record<DocumentType, React.ReactNode> = {
  [DocumentType.PDF]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M10.3 18.2c.5.5 1.2.8 2.1.8 1.4 0 2.4-1 2.4-2.4 0-1.6-1.3-2.6-2.8-2.6-1 0-1.3.3-1.3.3"></path><path d="M14.2 14.3c.3-.3.5-.7.5-1.1 0-.9-.7-1.5-1.6-1.5-.7 0-1.2.3-1.5.6"></path></svg>,
  [DocumentType.DOCX]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 18v-6"></path><path d="M15 15h-6"></path></svg>,
  [DocumentType.URL]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>,
  [DocumentType.TEXT]: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>,
};

type SearchResult = {
    answer: string;
    citations: DocType[];
};

type SearchMode = 'Semantic' | 'Keyword' | 'Hybrid';

const StatusBadge = ({ status }: { status: IngestionStatus }) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full inline-flex items-center';
    const statusClasses = {
        [IngestionStatus.COMPLETED]: 'bg-green-500/20 text-green-400',
        [IngestionStatus.INGESTING]: 'bg-blue-500/20 text-blue-400 animate-pulse',
        [IngestionStatus.PENDING]: 'bg-yellow-500/20 text-yellow-400',
        [IngestionStatus.FAILED]: 'bg-red-500/20 text-red-400',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const SpaceCard = ({ space, onClick, isSelected }: { space: Space, onClick: () => void, isSelected: boolean }) => (
    <div
        onClick={onClick}
        className={`p-4 border rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-primary/20 border-primary' : 'bg-secondary border-border hover:border-primary/50'}`}
    >
        <div className="flex items-center">
            {SPACE_ICONS[space.icon]}
            <h3 className="ml-3 text-lg font-semibold">{space.name}</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{space.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">{space.docCount} documents</p>
    </div>
);

const SearchResultDisplay = ({ result, onClear }: { result: SearchResult, onClear: () => void }) => (
    <div className="border border-border rounded-lg bg-secondary/50 p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Query Result</h2>
            <button onClick={onClear} className="text-sm text-muted-foreground hover:text-foreground transition-colors">&times; Clear</button>
        </div>
        
        <div className="prose prose-invert max-w-none prose-p:text-foreground/90">
            <div className="flex items-start gap-3 p-4 bg-background/50 rounded-md">
                <SparklesIcon className="h-5 w-5 text-primary flex-shrink-0 mt-1"/>
                <p className="m-0">{result.answer}</p>
            </div>
        </div>

        {result.citations.length > 0 && (
            <div className="mt-6">
                <h3 className="font-semibold mb-3">Sources</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.citations.map(doc => (
                        <div key={doc.id} className="flex items-center p-3 bg-background/50 rounded-md border border-border">
                            {DOC_ICONS[doc.type]}
                            <span className="ml-3 text-sm truncate">{doc.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);


export const KnowledgeBase: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('Hybrid');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [ingestionJobs, setIngestionJobs] = useState<IngestionJob[]>(INITIAL_INGESTION_JOBS);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterDocType, setFilterDocType] = useState<string>('All');


  const filteredDocuments = DOCUMENTS.filter(doc => {
    const spaceMatch = !selectedSpace || doc.spaceId === selectedSpace.id;
    const statusMatch = filterStatus === 'All' || doc.status === filterStatus;
    const docTypeMatch = filterDocType === 'All' || doc.type === filterDocType;
    return spaceMatch && statusMatch && docTypeMatch;
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchResult(null);
    setSearchError(null);

    try {
        const lowerCaseQuery = query.toLowerCase();
        const allChunks = DOCUMENTS.flatMap(doc => doc.chunks);
        let retrievedChunks: Chunk[] = [];

        const semanticMatches = allChunks.filter(chunk => chunk.text.toLowerCase().includes(lowerCaseQuery));
        const keywords = lowerCaseQuery.split(' ').filter(k => k.length > 2);
        const keywordMatches = allChunks.filter(chunk => keywords.some(k => chunk.text.toLowerCase().includes(k)));

        if (searchMode === 'Semantic') {
            retrievedChunks = semanticMatches;
        } else if (searchMode === 'Keyword') {
            retrievedChunks = keywordMatches;
        } else { // Hybrid
            const combined = new Map<string, Chunk>();
            semanticMatches.forEach(c => combined.set(c.id, c));
            keywordMatches.forEach(c => combined.set(c.id, c));
            retrievedChunks = Array.from(combined.values());
        }
        
        if (retrievedChunks.length === 0) {
            setSearchResult({ 
                answer: "I couldn't find any relevant information in the knowledge base to answer your question.", 
                citations: [] 
            });
            return;
        }

        const context = retrievedChunks.map(c => c.text).join('\n---\n');
        const prompt = `Based *only* on the following context, provide a concise answer to the user's question. If the context doesn't contain the answer, state that the information is not available.

        CONTEXT:
        ${context}

        QUESTION:
        ${query}`;

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const answer = response.text;

        const citedDocIds = new Set(retrievedChunks.map(c => c.documentId));
        const citations = DOCUMENTS.filter(doc => citedDocIds.has(doc.id));

        setSearchResult({ answer, citations });

    } catch (error) {
        console.error("Error querying RAG system:", error);
        setSearchError("Sorry, something went wrong while processing your request.");
    } finally {
        setIsSearching(false);
    }
  };

  const handleImport = (documentName: string) => {
    const newJob: IngestionJob = {
        id: `job-${Date.now()}`,
        documentName,
        status: IngestionStatus.PENDING,
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setIngestionJobs(prevJobs => [newJob, ...prevJobs]);
    setIsImportModalOpen(false);
  };
  
  const clearFilters = () => {
    setSelectedSpace(null);
    setFilterStatus('All');
    setFilterDocType('All');
  };

  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between pb-4 border-b border-border">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Knowledge</h1>
                <p className="text-muted-foreground">Manage and query your company's knowledge base.</p>
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setIsImportModalOpen(true)}
                    className="bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-md hover:bg-muted transition-colors">
                    Import Document
                </button>
            </div>
        </header>
        
        {/* Search Bar Area */}
        <div className="py-4">
            <form onSubmit={handleSearch} className="flex gap-2 items-center">
                <div className="relative flex-grow">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input 
                      type="search" 
                      placeholder="Ask Maria a question..." 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-input pl-10 pr-4 py-2 rounded-md border border-border focus:ring-primary focus:border-primary" />
                </div>
                 <div className="flex items-center bg-secondary rounded-md p-1">
                    {(['Semantic', 'Keyword', 'Hybrid'] as SearchMode[]).map(mode => (
                        <button key={mode} type="button" onClick={() => setSearchMode(mode)} className={`px-3 py-1 text-xs font-semibold rounded ${searchMode === mode ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                            {mode}
                        </button>
                    ))}
                </div>
                <button type="submit" className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">Search</button>
            </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2 flex-1">
            {/* Main Content */}
            <div className="lg:col-span-2 flex flex-col">
                {isSearching && <div className="text-center p-8">Loading results...</div>}
                {searchError && <div className="text-center p-8 text-red-400">{searchError}</div>}
                
                {searchResult ? (
                    <SearchResultDisplay result={searchResult} onClear={() => { setSearchResult(null); setQuery(''); }} />
                ) : (
                    <>
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Spaces</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {SPACES.map(space => (
                                    <SpaceCard 
                                        key={space.id} 
                                        space={space} 
                                        onClick={() => setSelectedSpace(space.id === selectedSpace?.id ? null : space)}
                                        isSelected={space.id === selectedSpace?.id}
                                    />
                                ))}
                            </div>
                        </section>
                        
                        <section className="mt-8 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">{selectedSpace ? `${selectedSpace.name} Documents` : 'All Documents'}</h2>
                                <div className="flex items-center gap-2">
                                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-input border border-border rounded-md text-sm py-1.5 px-2 focus:outline-none focus:ring-primary focus:border-primary">
                                        <option value="All">All Statuses</option>
                                        <option value="Published">Published</option>
                                        <option value="Draft">Draft</option>
                                    </select>
                                     <select value={filterDocType} onChange={e => setFilterDocType(e.target.value)} className="bg-input border border-border rounded-md text-sm py-1.5 px-2 focus:outline-none focus:ring-primary focus:border-primary">
                                        <option value="All">All Types</option>
                                        {Object.values(DocumentType).map(type => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                    <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-foreground">Clear</button>
                                </div>
                            </div>
                            <div className="border rounded-lg overflow-hidden flex-1 flex flex-col">
                              <div className="overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-secondary">
                                        <tr>
                                            <th className="p-3 text-left font-semibold">Name</th>
                                            <th className="p-3 text-left font-semibold">Status</th>
                                            <th className="p-3 text-left font-semibold">Last Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredDocuments.map((doc, index) => (
                                            <tr key={doc.id} className={`border-t border-border ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/50'}`}>
                                                <td className="p-3 flex items-center">
                                                    {DOC_ICONS[doc.type]}
                                                    <span className="ml-3">{doc.name}</span>
                                                </td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${doc.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                        {doc.status}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-muted-foreground">{doc.updatedAt}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                              </div>
                            </div>
                        </section>
                    </>
                )}
            </div>

            {/* Right Sidebar / Ingestion Jobs */}
            <div className="flex flex-col">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Ingestion Jobs</h2>
                    <div className="space-y-3">
                        {ingestionJobs.map(job => (
                            <div key={job.id} className="p-3 bg-secondary rounded-lg">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium truncate pr-2">{job.documentName}</p>
                                    <StatusBadge status={job.status} />
                                </div>
                                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                                    <span>{job.submittedAt}</span>
                                    {job.duration && <span>{job.duration}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
        {isImportModalOpen && (
            <ImportDocumentModal 
                onClose={() => setIsImportModalOpen(false)} 
                onImport={handleImport} 
            />
        )}
    </div>
  );
};