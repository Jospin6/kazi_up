'use client'

import { ReactNode } from 'react'
import { LanguageProvider } from './LanguageProvider'

export function LanguageProviderWrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}
