import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");
    const body = await request.json();

    if (!token) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }

    // Validate required fields
    const requiredFields = ["userId", "date", "session", "present"];
    const missingFields = requiredFields.filter(
      (field) => body[field] === undefined || body[field] === null
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const base_url = `${process.env.BASE_URL}/api/admin/mark`;

    const response = await axios.post(base_url, body, {
      headers: {
        Authorization: token,
      },
    });

    const result = response.data;
    console.log("Attendance POST: Backend response:", result);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Attendance POST: Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to submit attendance",
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
