import dictionary from '@/locales/tr.json'

export const getDictionary = async () => dictionary

// Client-safe dictionary access
export const getClientDictionary = () => dictionary
