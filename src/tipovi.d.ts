interface WeatherData {
    coord: { lon: number; lat: number };
    weather: { id: number; main: string; description: string; icon: string }[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number; // Dodan optionalan ključ sea_level
      grnd_level?: number; // Dodan optionalan ključ grnd_level
    };
    visibility: number;
    wind: { speed: number; deg: number; gust?: number }; // Dodan optionalan ključ gust
    rain?: { "1h": number }; // Dodan optionalan ključ rain
    clouds: { all: number };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

  interface ApiResponseGradovi {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state: string;
  }
 //prognoza za 5 dana
  interface WeatherDataFor5Days {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherEntry[];
    city: City;
  }
  
  interface WeatherEntry {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: WeatherDetail[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      '3h': number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }
  
  interface WeatherDetail {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface City {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }