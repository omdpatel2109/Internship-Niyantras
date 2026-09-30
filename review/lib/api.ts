import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
    baseURL: "https://dummyjson.com",
});

// AUTHENTICATION INTERCEPTOR
api.interceptors.request.use(
    async (config) => {
        const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    
);

// HEADERS INTERCEPTOR
api.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json"; // the send in JSON

        config.headers["Accept"] = "application/json"; // the data accept in JSON

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//  RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => {
        console.log("Response Status:",response.status);

        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;