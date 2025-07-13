import { NextResponse } from "next/server";
import axios from "axios";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization")?.replace("Bearer ", "");
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const session = searchParams.get("session");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }
    if (!date || !session) {
      return NextResponse.json({ message: "Missing date or session" }, { status: 400 });
    }

    const response = await axios.get("https://corporateballersapi.onrender.com/api/admin/daily", {
      params: { date, session },
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to fetch daily attendance" },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}