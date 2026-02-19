import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { IP, LocationType } from "../types"


const GEO_LOCATION_URL = `https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// gets day index value 0 - 6 
// returns string value of the day
export function convertDayToString(day: number): string {
  switch (day) {
    case 0:
      return "Sunday"

    case 1:
      return "Monday"

    case 2:
      return "Tuesday"

    case 3:
      return "Wednesday"

    case 4:
      return "Thursday"

    case 5:
      return "Friday"

    case 6:
      return "Saturday"
    default:
      return ""
  }
}

// gets day index value 0 - 6 
// returns string value of the day
export function convertMonthToString(month: number): string {
  switch (month) {
    case 0:
      return "Jan"

    case 1:
      return "Feb"

    case 2:
      return "Mar"

    case 3:
      return "Apr"

    case 4:
      return "May"

    case 5:
      return "June"
    case 6:
      return "July"
    case 7:
      return "Aug"
    case 8:
      return "Sept"
    case 9:
      return "Oct"
    case 10:
      return "Nov"
    case 11:
      return "Dec"
    default:
      return ""
  }
}


// get users location (country)
export async function getUserCountry(): Promise<LocationType> {
  try {
    const response = await fetch(GEO_LOCATION_URL)
    const data: IP = await response.json()
    const { location } = data
    return {
      countryName: location.country,
      cityName: location.region
    }
  } catch (error) {
    console.error('could not get country data', error)
    return {
      countryName: "",
      cityName: ''
    }
  }
}

// format any weather number value
export function formatValue(value: number | undefined) {
  return Math.trunc(value ?? 0)
}


// validate if sunny , snow, partly cloudy, 
// rain, storm, fog, overcast , drizzle
// based on provided weather code

export function validateWeatherIcon(weatherCode: number) {
  if (weatherCode === 0) {
    return "/icon-sunny.webp";
  }

  if (weatherCode <= 3) {
    return "/icon-partly-cloudy.webp"
  }
  if (weatherCode <= 48) {
    return "/icon-fog.webp"
  }
  if (weatherCode <= 57) {
    return "/icon-drizzle.webp"
  }
  if (weatherCode <= 67) {
    return "/icon-rain.webp"
  }
  if (weatherCode <= 86) {
    return "/icon-snow.webp"
  }
  return "/icon-storm.webp"
}


