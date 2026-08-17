 "use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encrypt } from "./session";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Temporary user for learning
  if (
    email !== "admin@example.com" ||
    password !== "123456"
  ) {
    return {
      error: "Invalid email or password",
    };
  }

  const session = await encrypt({
    userId: "1",
    email,
  });

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    path: "/",
  });

  redirect("/dashboard");
}