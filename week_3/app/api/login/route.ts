import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/app/lib/session";
import { loginSchema } from "@/app/lib/validation";
import bcrypt from "bcryptjs";

const demoUser = {
  id: "1",
  email: "admin@example.com",

  // Password = password123
  passwordHash:
    "$2b$10$X7VJ7Qf4bYxJYv5x9KjQOeZq6KjK6J9sKJvFf1sXK5kJ8J8J8J8J8",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 400,
        }
      );
    }

    const { email, password } = result.data;

    if (email !== demoUser.email) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      demoUser.passwordHash
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const session = await encrypt({
      userId: demoUser.id,
      email: demoUser.email,
    });

    const response = NextResponse.json({
      message: "Login successful",
    });

    response.cookies.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}