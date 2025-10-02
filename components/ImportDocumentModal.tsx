import React, { useState } from 'react';

interface ImportDocumentModalProps {
    onClose: () => void;
    onImport: (documentName: string) => void;
}

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

export const ImportDocumentModal: React.FC<ImportDocumentModalProps> = ({ onClose, onImport }) => {
    const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
    const [url, setUrl] = useState('');
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const documentName = activeTab === 'upload' ? fileName : url;
        if (documentName) {
            onImport(documentName);
        }
    };

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Import Document</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">&times;</button>
                </div>
                
                <div>
                    <div className="border-b border-border">
                        <nav className="-mb-px flex space-x-6">
                            <button onClick={() => setActiveTab('upload')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'upload' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                                Upload File
                            </button>
                            <button onClick={() => setActiveTab('url')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'url' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                                Import from URL
                            </button>
                        </nav>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {activeTab === 'upload' && (
                            <div className="mt-6">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-secondary rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center h-40 hover:border-primary transition-colors">
                                    <UploadIcon className="h-8 w-8 text-muted-foreground" />
                                    <span className="mt-2 text-sm font-medium text-foreground">{fileName || 'Click to upload or drag and drop'}</span>
                                    <span className="text-xs text-muted-foreground">PDF, DOCX, TXT (up to 10MB)</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                </label>
                            </div>
                        )}

                        {activeTab === 'url' && (
                            <div className="mt-6">
                                <label htmlFor="url" className="block text-sm font-medium text-muted-foreground">Website URL</label>
                                <input 
                                    type="url" 
                                    name="url" 
                                    id="url" 
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="mt-1 block w-full bg-input border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                    placeholder="https://example.com/pricing" 
                                    required
                                />
                            </div>
                        )}
                        
                        <div className="mt-6 flex justify-end gap-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-muted">Cancel</button>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">Start Ingestion</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
