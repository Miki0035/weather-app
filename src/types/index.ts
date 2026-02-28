export type UnitType = "metric" | "imperial"
export type PrecipitationType = "mm" | "in"
export type State = {
    unitType: UnitType,
    setUnitType: (value: UnitType) => void,
    showDropdown: boolean,
    setShowDropdown: () => void,
    showDays: boolean,
    setShowDays: () => void,
    day: Date,
    setDay: (value: Date) => void,
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
    isLoadingHourly: boolean,
    weather: WeatherData | null | undefined,
    latitude: number | null,
    longitude: number | null,
    updateHourly: (value: HourlyWeatherData) => void;
    hasError: boolean;
}

export interface WeatherData {
    current: {
        percipitation: number;
        temperature: number;
        time: Date,
        windSpeed: number;
        apparentTemperature: number;
        relativeHumidity: number;
        weatherCode: number;
    },
    daily: {
        // each day of the week
        time: Date[];
        // weather code for each day of the week (0 - 6)
        weatherCode: Float32Array<ArrayBufferLike>;
        // max temp for each day of the week (0 - 6)
        temperatureMax: Float32Array<ArrayBufferLike>;
        // min temp for each day of the week (0 - 6)
        temperatureMin: Float32Array<ArrayBufferLike>;
    };
    hourly: {
        // each hour of the day (0 - 23)
        time: Date[];
        // weather code for each hour of the day
        weatherCode: Float32Array<ArrayBufferLike>;
        // apperent temperature for each hour of the day
        apparentTemperature: Float32Array<ArrayBufferLike>;
    }
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

interface HourlyWeatherData {
    time: Date[];
    // weather code for each hour of the day
    weatherCode: Float32Array<ArrayBufferLike>;
    // apperent temperature for each hour of the day
    apparentTemperature: Float32Array<ArrayBufferLike>;
}

export interface Country {
    name: string;
    country: string;
    country_code: string;
    country_id: number;
    elevation: number;
    id: number;
    latitude: number;
    longitude: number;
    population: number;
}