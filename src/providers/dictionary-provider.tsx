'use client'

import * as React from 'react'
import { getDictionary } from '@/lib/dictionary'

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

const DictionaryContext = React.createContext<Dictionary | null>(null)

export function DictionaryProvider({
    dictionary,
    children,
}: {
    dictionary: Dictionary
    children: React.ReactNode
}) {
    return (
        <DictionaryContext.Provider value={dictionary}>
            {children}
        </DictionaryContext.Provider>
    )
}
export const useDictionary = () => {
    const context = React.useContext(DictionaryContext)
    if (!context) {
        throw new Error(
            'useDictionary must be used within a DictionaryProvider',
        )
    }
    return context
}
