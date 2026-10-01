import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
    baseURL: "https://dummyjson.com",
});

// Authentication Interceptor
api.interceptors.request.use(
    async (config) => {
        const cookieStore = await cookies();

        const token = cookieStore.get('access_token')?.value;
        
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return error;
    }
    
);

// Headers Interceptor
api.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json"; // the send in JSON

        config.headers["Accept"] = "application/json"; // the data accept in JSON

        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return error;
    }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log("Response Status:", response.status);
    return response;
  },
  (error) => {
    console.error(
      "Response error:",
      error.response?.data || error.message
    );

    return error;
  }
);

export default api;