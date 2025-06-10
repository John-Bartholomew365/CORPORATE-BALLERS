import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function PATCH(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");
    const body = await request.json();

    // console.log("Profile-Update Route: Received Authorization header:", token); // Debug: Log token
    // console.log("Profile-Update Route: Request body:", body); // Debug: Log body

    if (!token) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }

    // Optional: Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "address",
      "emergencyContact",
      "preferredPosition",
      "preferredFoot",
    ];
    const missingFields = requiredFields.filter((field) => !body[field] && body[field] !== 0);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const base_url = `${process.env.BASE_URL}/api/auth/profile-update`;

    const response = await axios.patch(base_url, body, {
      headers: {
        Authorization: token,
      },
    });

    const result = response.data;
    console.log("Profile-Update Route: Backend response:", result); // Debug: Log backend response

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Profile-Update Route: Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to update profile",
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