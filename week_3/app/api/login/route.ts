import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/app/lib/session";
import { loginSchema } from "@/app/lib/validation";
import bcrypt from "bcryptjs";

const demoUser = {
  email: "admin123@gmail.com",
  // Password = 123456
  passwordHash:
    "$2b$10$YpMrG1w6eExRqe936iUWGOjc.0eyAGotue/3JhezzLBoBNrUTafQy",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = loginSchema.safeParse(body);

    if(!result.success) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
      );
    }

    const { email, password } = result.data;

    if (email !== demoUser.email) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
      );
    }

    const passwordMatch = await bcrypt.compare(password,demoUser.passwordHash);

    if(!passwordMatch) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
      );
    }

    const session = await encrypt({
      email: demoUser.email,
    });

    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set("session", session, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    }); 

    return response;
  }catch{
    return NextResponse.json(
      {
        message: "Something went wrong",
      }
    );
  }
}