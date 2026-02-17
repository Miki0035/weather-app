import { create } from 'zustand'
import type { State } from '../types'
import { convertDayToString, getUserCountry } from '../lib/utils'


const useAppStore = create<State>((set) => ({
    isLoading: false,
    unitType: "metric",
    setUnitType: (value: "metric" | "imperial") => set(() => {
        if (value === "metric") {
            return {
                unitType: value,
                temperatureUnit: "celsius",
                windSpeedUnit: 'kmh',
                percipitationUnit: 'mm'
            }
        } else {
            return {
                unitType: value,
                temperatureUnit: "fahrenheit",
                windSpeedUnit: 'mph',
                percipitationUnit: 'inch'
            }
        }
    }),
    showDropdown: false,
    setShowDropdown: () => set((state) => ({ showDropdown: !state.showDropdown })),
    showDays: false,
    setShowDays: () => set((state) => ({ showDays: !state.showDays })),
    day: convertDayToString(new Date().getDay()),
    setDay: (value: string) => set(({ day: value })),
    temperatureUnit: "celsius",
    setTemperature: (value: string) => set(({ temperatureUnit: value })),
    windSpeedUnit: "kmh",
    setWindSpeed: (value: string) => set(({ windSpeedUnit: value })),
    percipitationUnit: "mm",
    setPercipitation: (value: string) => set(({ percipitationUnit: value })),
    countryName: '',
    cityName: '',
    fetchCountryName: async () => {
        const { countryName } = await getUserCountry();
        set({ countryName });
    },
    fetchCityName: async () => {
        const { cityName } = await getUserCountry();
        set({ cityName });
    },
    weather: null
}))

export default useAppStore;