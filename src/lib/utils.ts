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
      return "Tuesday"
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

// format temperature value
export function formatTemperature(temperature: number | undefined) {
  return Math.trunc(temperature ?? 0)
}
