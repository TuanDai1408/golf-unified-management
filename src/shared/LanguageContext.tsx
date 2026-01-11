
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, authTranslations, AuthTranslations } from './authTranslations';
import { translations as managerTrans, Translations as ManagerTrans } from '../manager/translations';
import { translations as adminTrans, Translations as AdminTrans } from '../admin/translations';

interface GlobalTranslations {
    auth: AuthTranslations;
    manager: ManagerTrans;
    admin: AdminTrans;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: GlobalTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('unified-golf-language');
        return (saved as Language) || 'vi';
    });

    useEffect(() => {
        localStorage.setItem('unified-golf-language', language);
        document.documentElement.lang = language;
    }, [language]);

    const t: GlobalTranslations = {
        auth: authTranslations[language],
        manager: managerTrans[language],
        admin: adminTrans[language],
    };

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
