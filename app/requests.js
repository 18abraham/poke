import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigate } from "./navigation";
export const request = axios.create({
    baseURL:"https://xv6k62rn-5000.usw3.devtunnels.ms/"
})
//Esto se va a ejecutar ANTES de hacer la petición
request.interceptors.request.use( async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//Esto se va a ejecutar INMEDIATAMENTE DESPUES de recibir una respuesta
request.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            await AsyncStorage.removeItem("token");
            navigate("Login")
        }
        return Promise.reject(error);
    }
);

export const getUser = async () => {
    const response = await request.get('/users/get');
    return response.data;
  };
  
  export const updateUser = async (userData) => {
    const response = await request.put('/users/update', userData);
    return response.data;
  };
  