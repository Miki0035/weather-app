import { fetchWeatherApi } from "openmeteo";
import useAppStore from "../store";

const { temperatureUnit: temperature, windSpeedUnit: windSpeed, percipitationUnit: percipitation } = useAppStore.getState()
const WEATHER_ENDPOINT_URL = `https://api.open-meteo.com/v1/forecast`;
const LOCATION_ENDPOINT_URL = "https://geocoding-api.open-meteo.com/v1/search"

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const getWeather = async (searchTerm: string) => {
    const WEATHER_QUERY = {
        current: "weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation",
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        hourly: 'weather_code,apparent_temperature',
        "temperature_unit": temperature,
        "precipitation_unit": percipitation,
        "wind_speed_unit": windSpeed

    }

    try {
        if (searchTerm === "") {

            // Get coordianates of the search country
            const coordinateResponse = await fetch(`${LOCATION_ENDPOINT_URL}?name=berlin`)
            const coordinates = await coordinateResponse.json();

            // get country to show on card
            // get latitude and longitude  to get weather data
            const { latitude, longitude, country, name } = coordinates.results[0]

            // update the countryName and cityName state
            useAppStore.setState({ countryName: country, cityName: name })

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
            // const hourly = response.hourly()!;
            const daily = response.daily()!;


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
                // hourly: {
                //     time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                //         (t) => new Date((t + utcOffsetSeconds) * 1000)
                //     ),
                //     weatherCode: daily.variables(0)!.valuesArray()!,
                //     apparentTemperature: hourly.variables(1)!.valuesArray()!, // `.valuesArray()` get an array of floats
                // },

            };
            useAppStore.setState({ weather: weatherData })
            console.log(`There is no search term weatherData:`, weatherData)
            return weatherData;
        }


        // Get coordianates of the search country
        const coordinateResponse = await fetch(`${LOCATION_ENDPOINT_URL}?name=${searchTerm}`)
        const coordinates = await coordinateResponse.json();

        // get country to show on card
        // get latitude and longitude  to get weather data
        const { latitude, longitude, country, name } = coordinates.results[0]

        // update the countryName and cityName state
        useAppStore.setState({ countryName: country, cityName: name })

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
        // const hourly = response.hourly()!;
        const daily = response.daily()!;


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
            // hourly: {
            //     time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            //         (t) => new Date((t + utcOffsetSeconds) * 1000)
            //     ),
            //     weatherCode: daily.variables(0)!.valuesArray()!,
            //     apparentTemperature: hourly.variables(1)!.valuesArray()!, // `.valuesArray()` get an array of floats
            // },

        };

        useAppStore.setState({ weather: weatherData })
        console.log(`There is search term weatherData:`, weatherData)
        return weatherData;
    } catch (error) {
        console.log('error getting weather', error);
        return null;
    }
}