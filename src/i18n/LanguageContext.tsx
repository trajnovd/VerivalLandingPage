import { createContext, useContext, useState, type ReactNode } from 'react'
import { en } from './en'
import { si } from './si'

export type Lang = 'en' | 'si'
type Translations = typeof en

const LanguageContext = createContext<{
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}>({ lang: 'en', setLang: () => {}, t: en })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const t = lang === 'en' ? en : si

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
