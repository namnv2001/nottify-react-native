import { createContext } from 'react'

const MusicFileContext = createContext(true)

export const MusicFileProvider = MusicFileContext.Provider
export const MusicFileConsumer = MusicFileContext.Consumer
export default MusicFileContext
