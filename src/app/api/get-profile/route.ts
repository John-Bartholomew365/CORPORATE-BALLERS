import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");


    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    const base_url = `${process.env.BASE_URL}/api/auth/profile`;

    const response = await axios.get(base_url, {
      headers: {
        Authorization: token, // Pass the token as is (includes 'Bearer ')
      },
    });

    const result = response.data;

    return NextResponse.json(result);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to fetch players",
          error: error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}