"use server";

import api from "@/lib/api";

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
      message: "Something went wrong.",
    };
  }
}