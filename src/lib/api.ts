import { fetchWeatherApi } from "openmeteo";
import useAppStore from "../store";
import type { Country } from "../types";

const { updateHourly, setDay } = useAppStore.getState()
const WEATHER_ENDPOINT_URL = `https://api.open-meteo.com/v1/forecast`;
const LOCATION_ENDPOINT_URL = "https://geocoding-api.open-meteo.com/v1/search"

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const getWeather = async (searchTerm: string) => {

    const { temperatureUnit: temperature, windSpeedUnit: windSpeed, percipitationUnit: percipitation, day } = useAppStore.getState()

    const WEATHER_QUERY = {
        current: "weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation",
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        hourly: 'weather_code,apparent_temperature',
        timezone: "auto",
        "temperature_unit": temperature,
        "precipitation_unit": percipitation,
        "wind_speed_unit": windSpeed
    }

    const HOURLY_WEATHER_QUERY = {
        hourly: 'weather_code,apparent_temperature',
        start_date: day.toISOString().split('T')[0],
        end_date: day.toISOString().split('T')[0],
        timezone: "auto",
        "temperature_unit": temperature,
        "precipitation_unit": percipitation,
        "wind_speed_unit": windSpeed
    }

    useAppStore.setState({ hasError: false });
    useAppStore.setState({ isLoading: true });
    try {
        if (searchTerm === "") {
            // Get coordianates of the search country
            const coordinateResponse = await fetch(`${LOCATION_ENDPOINT_URL}?name=Addis Ababa`)
            const coordinates = await coordinateResponse.json();


            // get country to show on card
            // get latitude and longitude  to get weather data
            const { latitude, longitude, country, name } = coordinates.results[0]

            // update the countryName and cityName state
            useAppStore.setState({ countryName: country, cityName: name, latitude, longitude })


            // get current and daily weather data of the country
            const params = {
                latitude: [latitude],
                longitude: [longitude],
                ...WEATHER_QUERY
            }
            const responses = await fetchWeatherApi(WEATHER_ENDPOINT_URL, params);
            const response = responses[0];

            const utcOffsetSeconds = response.utcOffsetSeconds();
            const current = response.current()!;
            const daily = response.daily()!;


            // get hourly weather data of the country
            const hourlyParams = {
                latitude: [latitude],
                longitude: [longitude],
                ...HOURLY_WEATHER_QUERY
            }
            const hourlyResponses = await fetchWeatherApi(WEATHER_ENDPOINT_URL, hourlyParams);
            const hourlyResponse = hourlyResponses[0];
            const hourly = hourlyResponse.hourly()!;


            const weatherData = {
                current: {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    weatherCode: current.variables(0)!.value(),
                    temperature: current.variables(1)!.value(), // Current is only 1 value, therefore `.value()`
                    apparentTemperature: current.variables(2)!.value(),
                    relativeHumidity: current.variables(3)!.value(),
                    windSpeed: current.variables(4)!.value(),
                    percipitation: current.variables(5)!.value()
                },
                daily: {
                    time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                        (t) => new Date((t + utcOffsetSeconds) * 1000)
                    ),
                    weatherCode: daily.variables(0)!.valuesArray()!,
                    temperatureMax: daily.variables(1)!.valuesArray()!,
                    temperatureMin: daily.variables(2)!.valuesArray()!,
                },
                hourly: {
                    time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                        (t) => new Date((t + utcOffsetSeconds) * 1000)
                    ),
                    weatherCode: hourly.variables(0)!.valuesArray()!,
                    apparentTemperature: hourly.variables(1)!.valuesArray()!, // `.valuesArray()` get an array of floats
                },

            };


            if (weatherData.current === undefined || weatherData.daily === undefined || weatherData.hourly === undefined) {
                useAppStore.setState({ weather: null })
                return
            }
            useAppStore.setState({ weather: weatherData })
            return;
        }


        // Get coordianates of the search country
        const coordinateResponse = await fetch(`${LOCATION_ENDPOINT_URL}?name=${searchTerm}`)
        const coordinates = await coordinateResponse.json();

        // get country to show on card
        // get latitude and longitude  to get weather data
        const { latitude, longitude, country, name } = coordinates.results[0]

        // update the countryName and cityName state
        useAppStore.setState({ countryName: country, cityName: name, latitude, longitude })

        // get weather data of the country
        const params = {
            latitude: [latitude],
            longitude: [longitude],
            ...WEATHER_QUERY
        }
        const responses = await fetchWeatherApi(WEATHER_ENDPOINT_URL, params);
        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const daily = response.daily()!;


        // get hourly weather data of the country
        const hourlyParams = {
            latitude: [latitude],
            longitude: [longitude],
            ...HOURLY_WEATHER_QUERY
        }

        const hourlyResponses = await fetchWeatherApi(WEATHER_ENDPOINT_URL, hourlyParams);
        const hourlyResponse = hourlyResponses[0];
        const hourly = hourlyResponse.hourly()!;


        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                weatherCode: current.variables(0)!.value(),
                temperature: current.variables(1)!.value(), // Current is only 1 value, therefore `.value()`
                apparentTemperature: current.variables(2)!.value(),
                relativeHumidity: current.variables(3)!.value(),
                windSpeed: current.variables(4)!.value(),
                percipitation: current.variables(5)!.value()
            },
            daily: {
                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                weatherCode: daily.variables(0)!.valuesArray()!,
                temperatureMax: daily.variables(1)!.valuesArray()!,
                temperatureMin: daily.variables(2)!.valuesArray()!,
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                weatherCode: hourly.variables(0)!.valuesArray()!,
                apparentTemperature: hourly.variables(1)!.valuesArray()!, // `.valuesArray()` get an array of floats
            },

        };
        if (weatherData.current === undefined || weatherData.daily === undefined || weatherData.hourly === undefined) {
            useAppStore.setState({ weather: null })
            return;
        }
        useAppStore.setState({ weather: weatherData })
        return;
    } catch (error) {
        console.error('error getting weather data', error);
        useAppStore.setState({ hasError: true, weather: null });
    } finally {
        useAppStore.setState({ isLoading: false });
    }
}


export const getHourlyWeather = async (date: Date) => {

    const { temperatureUnit: temperature, windSpeedUnit: windSpeed, percipitationUnit: percipitation } = useAppStore.getState()


    const HOURLY_WEATHER_QUERY = {
        hourly: 'weather_code,apparent_temperature',
        start_date: date.toISOString().split('T')[0],
        end_date: date.toISOString().split('T')[0],
        timezone: "auto",
        "temperature_unit": temperature,
        "precipitation_unit": percipitation,
        "wind_speed_unit": windSpeed
    }


    // get states
    const { latitude, longitude } = useAppStore.getState()

    useAppStore.setState({ hasError: false });
    useAppStore.setState({ isLoadingHourly: true });

    try {
        // get hourly weather data of the country
        const hourlyParams = {
            latitude: [latitude],
            longitude: [longitude],
            ...HOURLY_WEATHER_QUERY
        }

        const hourlyResponses = await fetchWeatherApi(WEATHER_ENDPOINT_URL, hourlyParams);

        const hourlyResponse = hourlyResponses[0];


        const utcOffsetSeconds = hourlyResponse.utcOffsetSeconds();
        const hourly = hourlyResponse.hourly()!;


        const weatherData = {
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                weatherCode: hourly.variables(0)!.valuesArray()!,
                apparentTemperature: hourly.variables(1)!.valuesArray()!, // `.valuesArray()` get an array of floats
            },

        };

        if (weatherData.hourly === undefined) return;
        // update hourly data
        updateHourly(weatherData.hourly)
        // update selected date
        setDay(date)
        return;
    } catch (error) {
        console.error('Error getting hourly weather', error);
        useAppStore.setState({ hasError: true });
        return;
    } finally {
        useAppStore.setState({ isLoadingHourly: false });
    }
}


// get countries to select
export const getCountries = async (searchTerm: string): Promise<Country[] | undefined> => {
    try {
        if (searchTerm === "") return;

        // Get coordianates of the search country
        const coordinateResponse = await fetch(`${LOCATION_ENDPOINT_URL}?name=${searchTerm}`)
        const coordinates = await coordinateResponse.json();

        // get country to show on card
        // get latitude and longitude  to get weather data
        return coordinates.results as Country[];

    } catch (error) {
        console.error('error getting countries data', error);
        useAppStore.setState({ hasError: true, weather: null });
    } finally {
        useAppStore.setState({ isLoading: false });
    }
}