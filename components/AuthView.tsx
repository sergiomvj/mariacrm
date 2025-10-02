import React, { useState } from 'react';

interface AuthViewProps {
    onLogin: () => void;
}

const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.38a1 1 0 0 1 .82.42l1.6 2.4a1 1 0 0 0 .82.42H18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2.18a1 1 0 0 0-.82.42l-1.6 2.4a1 1 0 0 1-.82.42h-.38a1 1 0 0 0-1 1V20a2.5 2.5 0 0 1-5 0v-1.2a1 1 0 0 0-1-1h-.38a1 1 0 0 1-.82-.42l-1.6-2.4a1 1 0 0 0-.82-.42H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2.18a1 1 0 0 0 .82-.42l1.6-2.4a1 1 0 0 1 .82-.42h.38a1 1 0 0 0 1-1V4.5A2.5 2.5 0 0 1 9.5 2z" />
    </svg>
);


export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // In a real app, you'd call an API.
        // For this mock, we'll just check for a non-empty password.
        if (password) {
            onLogin();
        } else {
            setError('Please enter a password.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-sm p-8 space-y-8 bg-card border border-border rounded-xl shadow-2xl">
                <div className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <BrainIcon className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Maria<span className="font-light">CRM</span></h1>
                    <p className="mt-2 text-muted-foreground">
                        {isLoginView ? 'Welcome back! Please sign in.' : 'Create your account to get started.'}
                    </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {!isLoginView && (
                         <div>
                            <label className="text-sm font-medium text-foreground" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="John Doe"
                            />
                        </div>
                    )}
                    <div>
                        <label className="text-sm font-medium text-foreground" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-foreground" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-2 px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <div>
                        <button type="submit" className="w-full px-4 py-2.5 font-semibold text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-colors">
                            {isLoginView ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>
                </form>
                
                <p className="text-sm text-center text-muted-foreground">
                    {isLoginView ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={() => setIsLoginView(!isLoginView)} className="ml-1 font-semibold text-primary hover:underline">
                        {isLoginView ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};