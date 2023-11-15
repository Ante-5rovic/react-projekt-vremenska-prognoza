import axios from "axios"
const apiKey = 'f114c0ba238822b8ca161654532a0650';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";
const num=5;//broj ogranicenja u shearch listi



export const searchGrad=async(lat:number,lon:number): Promise<WeatherData | null>=>{
    //ovo koristim da mi api vrati vemensku prognozu
    const params = {
        lat: lat,
        lon: lon,
        appid:apiKey,
    };

    try{
        const response = await axios.get(apiUrl, { params });
        const result = response.data;
        if (response!==null) {
            //console.log(result);            
            return await result;
        } else {
            console.log(`Geocoding nije uspješan. Status: ${result.status}`);
            return await null;
        }
    }catch(error){
        console.error("Greška prilikom izvršavanja Geocoding API-ja:", error);
        return await null;
    }

}



export const  geocodeLocation=async(locationName: string): Promise<ApiResponseGradovi[] | null>=> {
    //ovo koristim da mi api vrati imena gradova
    const params = {
        q: locationName,
        appid: apiKey,
        limit:num,
    };
    try {
        const response = await axios.get(baseUrl, { params });
        const result = response.data;
        if (Array.isArray(result)) {
            //console.log(result[0]);            
            return await result;
        } else {
            console.log(`Geocoding nije uspješan. Status: ${result.status}`);
            return await null;
        }
    } catch (error) {
        console.error("Greška prilikom izvršavanja Geocoding API-ja:", error);
        return await null;
    }
}
