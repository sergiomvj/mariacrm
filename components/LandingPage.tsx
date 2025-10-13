import React, { useState } from 'react';

interface LandingPageProps {
    onShowLogin: () => void;
}

// Icons
const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.38a1 1 0 0 1 .82.42l1.6 2.4a1 1 0 0 0 .82.42H18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2.18a1 1 0 0 0-.82.42l-1.6 2.4a1 1 0 0 1-.82.42h-.38a1 1 0 0 0-1 1V20a2.5 2.5 0 0 1-5 0v-1.2a1 1 0 0 0-1-1h-.38a1 1 0 0 1-.82-.42l-1.6-2.4a1 1 0 0 0-.82-.42H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2.18a1 1 0 0 0 .82.42l1.6-2.4a1 1 0 0 1 .82-.42h.38a1 1 0 0 0 1-1V4.5A2.5 2.5 0 0 1 9.5 2z" /> </svg> );
const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2z" /></svg> );
const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> );
const InboxIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /> </svg> );
const RepeatIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /> </svg> );
const BeakerIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4.5 3h15" /> <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" /> <path d="M6 14h12" /> </svg> );
const DatabaseIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" /> </svg> );
const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> );
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> );


const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-secondary/50 p-6 rounded-lg border border-border transition-all hover:border-primary/50 hover:scale-105">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string, name: string, title: string, company: string, avatarUrl: string }> = ({ quote, name, title, company, avatarUrl }) => (
    <div className="bg-secondary/50 p-6 rounded-lg border border-border">
        <blockquote className="text-muted-foreground italic">"{quote}"</blockquote>
        <div className="flex items-center mt-4">
            <img src={avatarUrl} alt={name} className="h-12 w-12 rounded-full" />
            <div className="ml-4">
                <p className="font-bold">{name}</p>
                <p className="text-sm text-muted-foreground">{title}, {company}</p>
            </div>
        </div>
    </div>
);

const PricingCard: React.FC<{
    plan: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
}> = ({ plan, price, description, features, isPopular }) => (
    <div className={`bg-secondary/50 p-8 rounded-lg border ${isPopular ? 'border-primary' : 'border-border'} transition-all hover:scale-105 relative`}>
        {isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full">
                MOST POPULAR
            </div>
        )}
        <h3 className="text-xl font-bold mb-2">{plan}</h3>
        <p className="text-4xl font-extrabold mb-4">{price}<span className="text-sm font-normal text-muted-foreground">{plan !== "Custom" && "/user/month"}</span></p>
        <p className="text-sm text-muted-foreground mb-6 h-10">{description}</p>
        <ul className="space-y-3 mb-8">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full font-semibold py-3 rounded-md transition-colors ${isPopular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}>
            {plan === 'Custom' ? 'Contact Sales' : 'Get Started'}
        </button>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin }) => {
    const [language, setLanguage] = useState('en');
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const languages: { [key: string]: string } = {
        'en': 'EN',
        'es': 'ES',
        'pt-br': 'PT',
    };

    return (
        <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] -z-10"></div>
            
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                         <BrainIcon className="h-7 w-7 text-primary" />
                         <h1 className="ml-2 text-xl font-bold">Maria<span className="font-light">CRM</span></h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
                        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} onBlur={() => setTimeout(() => setIsLangMenuOpen(false), 150)} className="flex items-center gap-1.5 bg-secondary text-secondary-foreground font-semibold px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm">
                                <GlobeIcon className="h-4 w-4" />
                                <span>{languages[language]}</span>
                            </button>
                            {isLangMenuOpen && (
                                <div className="absolute top-full right-0 mt-2 w-32 bg-card border border-border rounded-md shadow-lg py-1">
                                    <button onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">English</button>
                                    <button onClick={() => { setLanguage('es'); setIsLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">Español</button>
                                    <button onClick={() => { setLanguage('pt-br'); setIsLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted">Português</button>
                                </div>
                            )}
                        </div>
                        <button onClick={onShowLogin} className="hidden sm:block bg-secondary text-secondary-foreground font-semibold px-4 py-2 rounded-md hover:bg-muted transition-colors text-sm">
                            Member Login
                        </button>
                         <button onClick={onShowLogin} className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm">
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 pt-32">
                {/* Hero Section */}
                <section className="text-center py-20">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
                        The AI-First Sales <br /> Development Platform
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                        MariaCRM integrates a powerful RAG knowledge system with a full-featured CRM to supercharge your sales team. Generate accurate, grounded answers and close deals faster.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <button className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                            Request a Demo
                        </button>
                        <button className="bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-md hover:bg-muted transition-colors">
                            Learn More
                        </button>
                    </div>
                </section>
                
                {/* Features Section */}
                <section id="features" className="py-20">
                     <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold">Built for High-Performance Teams</h2>
                         <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                             Everything you need to automate outreach, gain deep insights, and hit your numbers.
                         </p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<ZapIcon className="w-8 h-8"/>}
                            title="AI-Powered Insights"
                            description="Predict your next move with AI-driven insights. Get next-best actions and objection rebuttals to focus on leads that will convert."
                        />
                         <FeatureCard 
                            icon={<BookOpenIcon className="w-8 h-8"/>}
                            title="RAG Knowledge System"
                            description="Eliminate 'I don't know'. Our RAG system ensures your AI provides accurate, company-approved answers, building trust and accelerating sales."
                        />
                         <FeatureCard 
                            icon={<InboxIcon className="w-8 h-8"/>}
                            title="Omnichannel Inbox"
                            description="Never miss a conversation. Engage leads across Email and WhatsApp from a single, unified inbox for a seamless customer experience."
                        />
                          <FeatureCard 
                            icon={<RepeatIcon className="w-8 h-8"/>}
                            title="Automated Cadences"
                            description="Put outreach on autopilot. Design powerful, multi-channel cadences that nurture leads and book meetings while you sleep."
                        />
                           <FeatureCard 
                            icon={<BeakerIcon className="w-8 h-8"/>}
                            title="A/B Lab"
                            description="Stop guessing, start winning. Optimize every touchpoint by A/B testing email subjects, messaging, and cadence timing to maximize engagement."
                        />
                           <FeatureCard 
                            icon={<DatabaseIcon className="w-8 h-8"/>}
                            title="Comprehensive CRM"
                            description="Your single source of truth. Manage your entire pipeline with a CRM that provides a 360-degree view of every customer interaction."
                        />
                     </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Trusted by Leading Sales Teams</h2>
                        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                            See how teams like yours are using MariaCRM to drive revenue and crush their quotas.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <TestimonialCard
                            quote="MariaCRM's AI insights are a game-changer. We've cut our response time in half and our meeting booking rate is up 30%."
                            name="Sarah Jones"
                            title="VP of Sales"
                            company="Innovate Inc."
                            avatarUrl="https://i.pravatar.cc/150?u=sarahjones"
                        />
                        <TestimonialCard
                            quote="The RAG knowledge base is our single source of truth. New reps are onboarded faster and our messaging is always consistent."
                            name="Mark Chen"
                            title="Sales Enablement Lead"
                            company="Data Solutions"
                            avatarUrl="https://i.pravatar.cc/150?u=markchen"
                        />
                        <TestimonialCard
                            quote="Finally, a CRM that thinks like a salesperson. The automated cadences and omnichannel inbox save my team hours every day."
                            name="Emily Rodriguez"
                            title="SDR Manager"
                            company="Global Tech"
                            avatarUrl="https://i.pravatar.cc/150?u=emilyrodriguez"
                        />
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
                        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                            Choose the plan that's right for your team. No hidden fees.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <PricingCard
                            plan="Pro"
                            price="$129"
                            description="For growing teams that need to automate their sales process and gain critical insights."
                            features={[
                                'Full CRM Suite',
                                'RAG Knowledge System',
                                'Omnichannel Inbox',
                                'Automated Cadences',
                                'Standard AI Insights',
                            ]}
                        />
                        <PricingCard
                            plan="Enterprise"
                            price="$199"
                            description="For established teams that require advanced AI, customization, and premium support."
                            features={[
                                'Everything in Pro, plus:',
                                'Advanced AI Insights',
                                'Predictive Booking',
                                'Voice SDR Integration',
                                'Dedicated Support',
                                'Custom Integrations',
                            ]}
                            isPopular={true}
                        />
                        <PricingCard
                            plan="Custom"
                            price="Let's Talk"
                            description="For large organizations with unique needs for security, compliance, and scale."
                            features={[
                                'Everything in Enterprise, plus:',
                                'Custom Data Models',
                                'On-premise Deployment',
                                'SAML SSO',
                                'Custom Guardrails',
                            ]}
                        />
                    </div>
                </section>


                 {/* CTA Section */}
                <section className="py-20">
                    <div className="bg-secondary/50 rounded-lg p-10 md:p-16 text-center border border-border">
                         <h2 className="text-3xl md:text-4xl font-bold">Ready to Revolutionize Your Sales?</h2>
                         <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                             Stop guessing and start selling with the power of grounded AI. See how MariaCRM can transform your sales development process.
                         </p>
                         <div className="mt-8">
                             <button className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                                Get Started Today
                            </button>
                         </div>
                    </div>
                </section>

            </main>

            <footer className="border-t border-border mt-20">
                <div className="container mx-auto px-6 py-8 text-center text-muted-foreground text-sm">
                    <p>&copy; {new Date().getFullYear()} MariaCRM, Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};