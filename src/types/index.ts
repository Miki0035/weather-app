type UnitType = "metric" | "imperial"
type Percipitation = "mm" | "in"
export type State = {
    unitType: UnitType,
    setUnitType: (value: UnitType) => void,
    showDropdown: boolean,
    setShowDropdown: () => void,
    temperature: string,
    setTemperature: (value: string) => void,
    windSpeed: string,
    setWindSpeed: (value: string) => void,
    percipitation: string,
    setPercipitation: (value: Percipitation) => void,
}