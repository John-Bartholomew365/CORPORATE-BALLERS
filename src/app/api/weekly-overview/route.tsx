import { NextResponse } from "next/server";
import axios from "axios";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization")?.replace("Bearer ", "");
    const { searchParams } = new URL(request.url);
    const weekStart = searchParams.get("weekStart");
    const weekEnd = searchParams.get("weekEnd");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }
    if (!weekStart || !weekEnd) {
      return NextResponse.json({ message: "Missing weekStart or weekEnd" }, { status: 400 });
    }

    const response = await axios.get("https://corporateballersapi.onrender.com/api/admin/weekly-overview", {
      params: { weekStart, weekEnd },
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to fetch weekly overview" },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}