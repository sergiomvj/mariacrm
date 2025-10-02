import React, { useState } from 'react';
import { CONVERSATIONS } from '../constants';
import type { Conversation, Message } from '../types';
import { Channel } from '../types';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>);
const EmailIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);

const ChannelIcon: React.FC<{ channel: Channel, className?: string }> = ({ channel, className }) => {
    if (channel === Channel.WHATSAPP) return <WhatsAppIcon className={className} />;
    return <EmailIcon className={className} />;
};

const ConversationListItem: React.FC<{ conv: Conversation, isSelected: boolean, onClick: () => void }> = ({ conv, isSelected, onClick }) => (
    <div 
        onClick={onClick}
        className={`p-3 flex items-start gap-3 cursor-pointer rounded-lg ${isSelected ? 'bg-primary/20' : 'hover:bg-muted/50'}`}
    >
        <img src={conv.contactAvatar} alt={conv.contactName} className="h-10 w-10 rounded-full" />
        <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold truncate">{conv.contactName}</h3>
                <p className="text-xs text-muted-foreground flex-shrink-0">{conv.timestamp}</p>
            </div>
            <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
        </div>
         {conv.unreadCount > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{conv.unreadCount}</span>}
    </div>
);

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isOutbound = message.direction === 'outbound';
    return (
        <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl ${isOutbound ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${isOutbound ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{message.timestamp}</p>
            </div>
        </div>
    );
}

export const InboxView: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0] || null);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        const message: Message = {
            id: `msg-${Date.now()}`,
            text: newMessage,
            timestamp: 'Just now',
            direction: 'outbound',
            sender: 'John Doe',
        };

        const updatedConversation: Conversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
            lastMessage: newMessage,
            timestamp: 'Just now',
        };

        const updatedConversations = conversations.map(c => 
            c.id === updatedConversation.id ? updatedConversation : c
        );
        
        setConversations(updatedConversations);
        setSelectedConversation(updatedConversation);
        setNewMessage('');
    };

    return (
        <div className="flex-1 flex h-full overflow-hidden">
            {/* Left Panel: Conversation List */}
            <div className="w-1/3 border-r border-border flex flex-col">
                <header className="p-4 border-b border-border">
                    <h1 className="text-2xl font-bold">Inbox</h1>
                </header>
                <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                    {conversations.map(conv => (
                        <ConversationListItem 
                            key={conv.id}
                            conv={conv}
                            isSelected={selectedConversation?.id === conv.id}
                            onClick={() => setSelectedConversation(conv)}
                        />
                    ))}
                </div>
            </div>

            {/* Right Panel: Message Thread */}
            <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                    <>
                        <header className="p-4 border-b border-border flex items-center gap-3">
                            <img src={selectedConversation.contactAvatar} alt={selectedConversation.contactName} className="h-10 w-10 rounded-full" />
                            <div>
                                <h2 className="font-bold">{selectedConversation.contactName}</h2>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <ChannelIcon channel={selectedConversation.channel} className="h-3 w-3" />
                                    <span>{selectedConversation.channel}</span>
                                </div>
                            </div>
                        </header>
                        
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {selectedConversation.messages.map(msg => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}
                        </div>
                        
                        <footer className="p-4 border-t border-border">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input 
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full bg-input pl-4 pr-4 py-2 rounded-md border border-border focus:ring-primary focus:border-primary"
                                />
                                <button type="submit" className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
                                    Send
                                </button>
                            </form>
                        </footer>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-muted-foreground">Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};
