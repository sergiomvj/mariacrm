import React, { useState } from 'react';
import { LandingPage } from './LandingPage';
import { AuthView } from './AuthView';

interface LandingOrAuthProps {
    onLogin: () => void;
}

export const LandingOrAuth: React.FC<LandingOrAuthProps> = ({ onLogin }) => {
    const [showLogin, setShowLogin] = useState(false);

    if (showLogin) {
        return <AuthView onLogin={onLogin} />;
    }

    return <LandingPage onShowLogin={() => setShowLogin(true)} />;
};
