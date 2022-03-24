import create from 'zustand'

const useStore = create((set) => ({
  songs: [],
  setSongs: (songs) => set({ songs }),
  clearSongs: () => set({ songs: [] }),
}))

export { useStore }
