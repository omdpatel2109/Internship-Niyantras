import api from "@/lib/api";
import {cookies} from "next/headers";


export async function loginAction(
  username: string,
  password: string
) {


  try{
    const response = await api.post(
      "/auth/login",
      {
        username,
        password,
      }
    );
    const cookieStore = await cookies();
    cookieStore.set("access_token", response.data.accessToken, {
        httpOnly: true, //prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // check http and https
        sameSite: 'lax',  //prevenet from external link
        path: '/', // cookie is accessible from the entire site
        maxAge: 60 * 60 * 24 * 7, // 7 days cookie available
      }
    )
  
    return{
      success: true,
      message: "Login successful",

    };
  }catch(error: any){
    const status = error.response?.status;
    const backendMessage = error.response?.data?.message;


    if (status === 400 && backendMessage === "Username and password required"){
      return {
        success: false,
        message: "Your field is empty. Enter username and password.",
      };
    }

    if(status === 400 && backendMessage === "Invalid credentials"){
      return{
        success: false,
        message:
          "Username and password are incorrect. Please enter correct credentials.",
      };
    }

    return{
      success: false,
      message: error.response?.data?.message || "An error occurred during login.",
    };
  }
}