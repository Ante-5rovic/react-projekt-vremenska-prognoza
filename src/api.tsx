import axios from "axios"
import { type } from "os";
const apiKey = 'f114c0ba238822b8ca161654532a0650';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const city = 'London';

interface SearchResponse{
    data:WeatherData[];
}

export const searchGrad=async(imeGrada:string)=>{

    try{
        const data=await axios.get<SearchResponse>(
            apiUrl,
            {
                params:{
                    lat:44.34,
                    lon:10.99,
                    appid: apiKey,
                },
            }   
        );
        return data;
    }catch(error){
        if(axios.isAxiosError(error)){
            console.log("error message: ",error.message);
            return error.message;
        }else{
            console.log("unexpected error: ",error);
            return "An unexpected error has occured";
        }
    }

}


const num=5;
export const  geocodeLocation=async(locationName: string): Promise<ApiResponseGradovi[] | null>=> {
    const baseUrl = "http://api.openweathermap.org/geo/1.0/direct";
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
