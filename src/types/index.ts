export type UnitType = "metric" | "imperial"
export type PrecipitationType = "mm" | "in"
export type State = {
    unitType: UnitType,
    setUnitType: (value: UnitType) => void,
    showDropdown: boolean,
    setShowDropdown: () => void,
    showDays: boolean,
    setShowDays: () => void,
    day: string,
    setDay: (value: string) => void,
    temperatureUnit: string,
    setTemperature: (value: string) => void,
    windSpeedUnit: string,
    setWindSpeed: (value: string) => void,
    percipitationUnit: string,
    setPercipitation: (value: PrecipitationType) => void,
    countryName: string,
    cityName: string,
    fetchCountryName: () => Promise<void>,
    fetchCityName: () => Promise<void>
    isLoading: boolean,
    weather: WeatherData | null
}

export interface WeatherData {
    current: {
        percipitation: number;
        temperature: number;
        time: Date,
        windSpeed: number;
    },
    daily: {
        // each day of the week
        time: Date[];
        weatherCode: Float32Array<ArrayBufferLike>;
        // max temp for each day of the week (0 - 6)
        temperatureMax: Float32Array<ArrayBufferLike>;
        // min temp for each day of the week (0 - 6)
        temperatureMin: Float32Array<ArrayBufferLike>;
    };
    // hourly: {

    // }
}


export interface IP {
    location: {
        country: string,
        region: string,
    }
}

export type LocationType = {
    countryName: string;
    cityName: string
}