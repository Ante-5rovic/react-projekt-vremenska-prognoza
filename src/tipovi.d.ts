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