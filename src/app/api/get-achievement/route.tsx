import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const base_url = `${process.env.BASE_URL}/api/admin/${userId}/performance`;

    const response = await axios.get(base_url, {
      headers: {
        Authorization: token,
      },
    });

    const result = response.data;
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Get Achievement Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to fetch player performance",
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