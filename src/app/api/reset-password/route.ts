import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { password, confirmPassword, userId } = body;

    // Validate required fields
    if (!password || !confirmPassword || !userId) {
      return NextResponse.json(
        { message: "Password, confirmPassword, and userId are required" },
        { status: 400 }
      );
    }

    const payload = { password, confirmPassword, userId };

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      throw new Error("BASE_URL environment variable is not set");
    }

    const response = await axios.post(`${base_url}/api/auth/reset-password`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = response.data;

    if (result.statusCode === "00") {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { message: result.message || "Error resetting password" },
        { status: 400 }
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return NextResponse.json(error.response.data, {
          status: error.response.status,
        });
      }
      return NextResponse.json(
        { message: "No response from server", error: error.message },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
