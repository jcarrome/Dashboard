export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  current_weather: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  wind_speed_10m: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  wind_speed_10m: number[];
}