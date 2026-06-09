import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: 'EN' },
    { code: 'hi', name: 'Hindi', flag: 'HI' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.flag}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center justify-between ${
                currentLanguage.code === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span>{language.name}</span>
              <span className="text-xs font-medium">{language.flag}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
