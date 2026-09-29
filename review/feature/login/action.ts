export async function loginAction(
  username: string,
  password: string
) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();
    if(!response.ok) {
      let customMessage = "";

      if(data.message === "Username and password required"){
        customMessage = "Your field is empty.Enter username and password."
      }

      if(data.message === "Invalid credentials"){
        customMessage = "Username and password are incorrect. Please enter correct."
      }

      console.log("STATUS:", response.status);
      console.log("DATA:", data);

      return {
        success: false,
        message: customMessage || "Login failed",
      };
    }

    return{
      success: true,
      message: "Login successful",
      data,
    };
  }catch{
    return{
      success: false,
      message: "Something went wrong",
    };
  }
}