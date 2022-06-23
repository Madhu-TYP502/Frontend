import axios from "../api/axios";
import useAuth from "./useAuth";

const APIURL = "auth-ws/auth/refresh/token";
const useRefresh = () => {
    const {setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get(APIURL,{
            withCredentials : true
        });
        setAuth(prev => {
           console.log(JSON.stringify(prev)); 
           console.log(response.data.accessToken)
           return {...prev, accessToken: response.data.accessToken}
        })
        console.log(response.data.accessToken);
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefresh;