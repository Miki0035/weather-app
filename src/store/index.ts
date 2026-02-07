import { create } from 'zustand'
import type { State } from '../types'


const useAppStore = create<State>((set) => ({
    unitType: "metric",
    setUnitType: (value: "metric" | "imperial") => set(({ unitType: value })),
    showDropdown: false,
    setShowDropdown: () => set((state) => ({ showDropdown: !state.showDropdown })),
    temperature: "celsius",
    setTemperature: (value: string) => set(({ temperature: value })),
    windSpeed: "km/h",
    setWindSpeed: (value: string) => set(({ windSpeed: value })),
    percipitation: "mm",
    setPercipitation: (value: string) => set(({ percipitation: value })),
}))

export default useAppStore;