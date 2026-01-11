// 언어 전환기 컴포넌트 / Component chuyển đổi ngôn ngữ / Language Switcher Component

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../shared/LanguageContext';
import { Language } from '../../shared/authTranslations';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 언어 옵션 / Tùy chọn ngôn ngữ / Language options
    const languages: { code: Language; name: string; flag: string }[] = [
        { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'ko', name: '한국어', flag: '🇰🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
    ];

    // 현재 선택된 언어 / Ngôn ngữ đang chọn / Current selected language
    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    // 드롭다운 외부 클릭 감지 / Phát hiện click bên ngoài dropdown / Detect outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 언어 변경 핸들러 / Xử lý thay đổi ngôn ngữ / Language change handler
    const handleLanguageChange = (langCode: Language) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* 현재 언어 버튼 / Nút ngôn ngữ hiện tại / Current language button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all text-text-main font-medium"
                aria-label="Select Language"
            >
                <span className="text-xl">{currentLanguage.flag}</span>
                <span className="text-sm hidden sm:inline">{currentLanguage.name}</span>
                <span className="material-symbols-outlined text-[18px]">
                    {isOpen ? 'expand_less' : 'expand_more'}
                </span>
            </button>

            {/* 드롭다운 메뉴 / Menu dropdown / Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-border-light overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${language === lang.code ? 'bg-primary-subtle text-primary font-bold' : 'text-text-main'
                                }`}
                        >
                            <span className="text-2xl">{lang.flag}</span>
                            <span className="text-sm font-medium">{lang.name}</span>
                            {language === lang.code && (
                                <span className="material-symbols-outlined ml-auto text-primary text-[20px]">
                                    check_circle
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
