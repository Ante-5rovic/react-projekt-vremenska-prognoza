import axios from "axios"
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