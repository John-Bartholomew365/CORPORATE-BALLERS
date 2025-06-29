import { NextResponse } from "next/server";
import { headers } from "next/headers";
import axios from "axios";

export async function PATCH(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: "Tournament ID is required" },
        { status: 400 }
      );
    }

    if (!body.status) {
      return NextResponse.json(
        { message: "Status field is required" },
        { status: 400 }
      );
    }

    // Use the correct backend endpoint with path parameter
    const base_url = `${process.env.BASE_URL}/api/admin/update/${id}/status`;

    const response = await axios.patch(
      base_url,
      { status: body.status },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("Tournament Status Update Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to update status",
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